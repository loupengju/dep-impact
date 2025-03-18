const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
const path = require('path');

// 创建进度条
function createProgressBar() {
  return new cliProgress.SingleBar({
    clearOnComplete: false,
    hideCursor: true,
    format: colors.cyan('{bar}') + ' ' + colors.green('{percentage}%') + ' | ' + colors.yellow('{value}/{total}') + ' | ' + colors.blue('{title}')
  }, cliProgress.Presets.shades_grey);
}

// 判断文件是否为组件
function isComponent(filePath) {
  return (
    filePath.includes('/components/') ||
    filePath.includes('/layouts/') ||
    /[A-Z][a-zA-Z]*\.(jsx|tsx)$/.test(path.basename(filePath))
  );
}

// 判断文件是否为页面
function isPage(filePath) {
  return filePath.includes('/pages/');
}

// 获取文件类型标签
function getFileTypeLabel(filePath) {
  if (isPage(filePath)) return colors.green('📄 页面');
  if (isComponent(filePath)) return colors.blue('🧩 组件');
  return colors.yellow('📁 模块');
}

module.exports = {
  createProgressBar,
  isComponent,
  isPage,
  getFileTypeLabel
};