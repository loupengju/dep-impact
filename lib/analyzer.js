const { isComponent, isPage } = require('./utils');

// 分析依赖树
function analyzeDependencyTree(graph, file, visited = new Set()) {
  if (visited.has(file)) return new Set();
  visited.add(file);

  const directDependents = graph.depends(file);
  const allDependents = new Set(directDependents);

  directDependents.forEach(dependent => {
    const indirectDependents = analyzeDependencyTree(graph, dependent, visited);
    indirectDependents.forEach(d => allDependents.add(d));
  });

  return allDependents;
}

// 分析文件依赖并返回结果
function analyzeFileDependencies(file, dependencyGraph) {
  const allDependents = analyzeDependencyTree(dependencyGraph, file);
  const directDependents = dependencyGraph.depends(file);
  const indirectDependents = new Set(
    Array.from(allDependents).filter(d => !directDependents.includes(d))
  );

  const result = {
    file,
    direct: {
      pages: [],
      components: [],
      others: []
    },
    indirect: {
      pages: [],
      components: [],
      others: []
    }
  };

  // 分类直接依赖
  directDependents.forEach(dependent => {
    if (isPage(dependent)) {
      result.direct.pages.push(dependent);
    } else if (isComponent(dependent)) {
      result.direct.components.push(dependent);
    } else {
      result.direct.others.push(dependent);
    }
  });

  // 分类间接依赖
  indirectDependents.forEach(dependent => {
    if (isPage(dependent)) {
      result.indirect.pages.push(dependent);
    } else if (isComponent(dependent)) {
      result.indirect.components.push(dependent);
    } else {
      result.indirect.others.push(dependent);
    }
  });

  return result;
}

module.exports = {
  analyzeDependencyTree,
  analyzeFileDependencies
};