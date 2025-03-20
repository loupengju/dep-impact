const { execSync } = require('child_process');

function getChangedFiles(mainBranch="main") {
  try {
    // 获取当前分支名
    const currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim();

    // 获取与 main 分支相比的文件变更
    const changedFiles = execSync(`git diff ${mainBranch}...${currentBranch} --name-only`)
      .toString()
      .split('\n')
      .filter(Boolean);

    // 获取新增的文件
    const newFiles = execSync(`git diff ${mainBranch}...${currentBranch} --diff-filter=A --name-only`)
      .toString()
      .split('\n')
      .filter(Boolean);

    // 获取修改的文件
    const modifiedFiles = execSync(`git diff ${mainBranch}...${currentBranch} --diff-filter=M --name-only`)
      .toString()
      .split('\n')
      .filter(Boolean);

    // 获取删除的文件
    const deletedFiles = execSync(`git diff ${mainBranch}...${currentBranch} --diff-filter=D --name-only`)
      .toString()
      .split('\n')
      .filter(Boolean);

    return {
      all: changedFiles,
      added: newFiles,
      modified: modifiedFiles,
      deleted: deletedFiles,
      currentBranch
    };
  } catch (error) {
    console.error('获取文件变更失败：', error);
    return {
      all: [],
      added: [],
      modified: [],
      deleted: [],
      currentBranch: ''
    };
  }
}

module.exports = {
  getChangedFiles
};