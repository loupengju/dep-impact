#!/usr/bin/env node

const { execSync } = require('child_process');
const madge = require('madge');
const { analyzeFileDependencies } = require('../lib/analyzer');
const { printAnalysisResult } = require('../lib/printer');

async function main() {
  try {
    console.log('\n🔍 开始分析文件依赖关系...\n');

    // 获取git暂存区中被修改的文件
    const stagedFiles = execSync('git status -s')
      .toString()
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.slice(3))
      .filter(file => /\.(js|jsx|ts|tsx)$/.test(file));
    if (stagedFiles.length === 0) {
      console.log('没有检测到需要分析的文件变更');
      process.exit(0);
    }

    // 生成项目依赖图
    const projectRoot = process.cwd();
    console.log('正在构建依赖图...');
    const dependencyGraph = await madge(projectRoot, {
      baseDir: projectRoot,
      excludeRegExp: [/node_modules/],
      fileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      tsConfig: './tsconfig.json',
      webpackConfig: './webpack.config.js',
      includeNpm: true,
      detectiveOptions: {
        ts: {
          mixedImports: true
        },
        tsx: {
          mixedImports: true
        }
      }
    });

    // 分析所有文件的依赖关系
    const analysisResults = [];
    console.log('开始分析文件依赖关系')

    for (let i = 0; i < stagedFiles.length; i++) {
      const file = stagedFiles[i];
      // 更新进度条标题显示当前处理的文件
      console.log(`正在分析: ${file}`);
      analysisResults.push(analyzeFileDependencies(file, dependencyGraph));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('全部分析完成');
    // 输出分析结果
    printAnalysisResult(analysisResults);

    process.exit(0);
  } catch (error) {
    console.error('依赖分析失败：', error);
    process.exit(1);
  }
}

main();