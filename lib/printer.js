const colors = require('ansi-colors');
const Table = require('cli-table3');

// 输出分析结果
function printAnalysisResult(analysisResults) {
  console.log('\n📝 文件依赖分析结果：');

  analysisResults.forEach(result => {
    console.log(`\n文件路径：${result.file}`);

    const table = new Table({
      head: ['类型', '直接影响', '间接影响'],
      style: {
        head: ['cyan'],
        border: ['gray']
      }
    });

    // 添加页面行
    table.push([
      '📄 页面',
      result.direct.pages.length > 0
        ? result.direct.pages.map(p => colors.green(p)).join('\n')
        : '无',
      result.indirect.pages.length > 0
        ? result.indirect.pages.map(p => colors.green(p)).join('\n')
        : '无'
    ]);

    // 添加组件行
    table.push([
      '🧩 组件',
      result.direct.components.length > 0
        ? result.direct.components.map(c => colors.blue(c)).join('\n')
        : '无',
      result.indirect.components.length > 0
        ? result.indirect.components.map(c => colors.blue(c)).join('\n')
        : '无'
    ]);

    // 添加其他模块行
    table.push([
      '📁 其他',
      result.direct.others.length > 0
        ? result.direct.others.map(o => colors.yellow(o)).join('\n')
        : '无',
      result.indirect.others.length > 0
        ? result.indirect.others.map(o => colors.yellow(o)).join('\n')
        : '无'
    ]);

    console.log(table.toString());

  })

}

module.exports = {
  printAnalysisResult
};