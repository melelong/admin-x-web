#!/bin/sh

# 构建项目（生成 dist 目录）
npm run build:prod

# 进入构建目录
cd dist

# 初始化 Git 并提交
git init
git add -A
git commit -m 'GitHub Pages Deployment'

# 推送到 gh-pages 分支
git push -f git@github.com:byte-scheduler/admin-x-web.git main:gh-pages

# 返回上级目录
cd -