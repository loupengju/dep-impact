# dep-impact

[English](#english) | [中文](#chinese)

## English

A command-line tool for analyzing dependency impact in Node.js projects. Through static analysis and dependency graph construction, it helps developers quickly understand the usage and potential impact of dependencies.

### Features

- Analyze dependency relationships of modified files in the current changes
- Identify files that directly depend on the package and their reference locations
- Evaluate the potential impact level of dependencies
- Provide a friendly command-line interface with progress display

### Installation

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
