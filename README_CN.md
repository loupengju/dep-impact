# dep-impact

一个用于分析 Node.js 项目中依赖包影响范围的命令行工具。通过静态分析和依赖图构建，帮助开发者快速了解依赖包的使用情况和潜在影响。

## 功能特点

- 分析项目中本次的改动文件依赖情况
- 识别直接依赖该包的文件和引用位置
- 评估依赖包的潜在影响程度
- 提供友好的命令行界面和进度展示

## 安装

```bash
npm install -g dep-impact
```

## 使用方法

基本用法：
```bash
your-file changed in your-project
```

```bash
dep-impact
```
