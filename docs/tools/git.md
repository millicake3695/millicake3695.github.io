---
title: Git基础
categories:
 - Tools
tags:
 - Git
---

<!-- more -->


### Git command

[Github Docs](https://docs.github.com/en/github)

启用编辑：i 

退出编辑：ESC / q, 然后输入 :wq 保存并退出


### git install

  mac 终端下 git 集成在 xcode 下，但是 xcode 非常大，可通过以下命令只安装 git。

  ```bash
  xcode-select install
  git init
  ```


### git 加速

  常规的修改系统 host 配置，有提升但有限。

  :::tip
  macOS hosts文件位置：`/etc/hosts`

  (1) 首先，打开（访达）Finder。  
  (2) 使用组合键`Shift+Command+G`打开"前往文件夹"，输入框中输入`/etc/hosts`
  
  Windows hosts文件位置：`C:/windows/system32/drivers/etc/hosts`
  :::

  配置ip后 git clone 仍很慢的方法（以lodash为例）：

  将原地址（注意修改npm镜像 nrm use cnpm / taobao）

  ```bash
  git clone https://github.com/lodash/lodash.git
  ```

  改为

  ```bash
  git clone https://github.com.cnpmjs.org/lodash/lodash.git
  ```

  ### 刷新DNS缓存
  ```bash
  // Mac用户
  sudo killall -HUP mDNSResponder

  // Win
  ipconfig /flushdns
  ```

### 设置ssh

  ```bash
  $ ssh-keygen -t rsa -C "youremail@example.com"
  entry password
  ...
  done

  // 查看公钥
  cd ~/.ssh
  ls
    authorized_keys2  id_dsa       known_hosts
    config            id_dsa.pub
  cat ~/.ssh/id_rsa.pub
  ```

### Commands

  `git init`: 初始化 git 仓库

  `git add <file>`: 提交一次变更到本地仓库-暂存区(.git目录)

  `git add .`: 提交当前所有变更文件到暂存区

  `git commit -m <message>`: 提交本地暂存区变更到当前分支

  `git log --graph --pretty=oneline`: 单行显示提交日志 `--graph`显示分支合并图。每次提交都会创建一个`commit id`即版本号，git用`HEAD`表示当前版本，`HEAD^`表示上一个版本... `HEAD~100`表示前100个版本。

  `git reflog`: 查看命令历史

  `git reset --hard HEAD^`: 回退至上一个版本
  
  `git reset --hard 1094e`: 回退至`commit id`以`1094e`开头的特定版本，版本号不用写全（5-7位即可）

  `git reset HEAD <file>`: 撤销已提交至暂存区`git add`的文件修改

  `git checkout -- <file>`: 撤销修改，让目标文件回到最近一次`git commit`或`git add`时的状态

  `git rm <file>`: 删除文件

  `git remote add origin git@github.com:user/learngit.git`: 关联远程仓库origin

  `git push (-u) origin master/dev`: 将master/dev分支推送至远程仓库, `-u`首次推送将本地的master/dev分支和远程的master/dev分支关联起来，在以后的推送或者拉取时就可以省略

  `git clone ssh / https`: 克隆远程仓库

  `git checkout -b dev`、`git switch -c dev`: 创建并切换至dev分支

  `git branch dev`: 创建dev分支

  `git branch`: 查看所有分支

  `git branch -d dev`: 删除已合并的dev分支

  `git branch -D dev`: 强行删除未合并的dev分支

  `git push origin --delete dev`: 删除远程dev分支

  `git checkout dev`、`git switch dev`: 切换至dev分支

  `git merge dev`: 合并指定分支到当前分支，合并是“快进模式”，也就是直接把master指向dev的当前提交

  `git status`: 查看当前版本库状态

  `git stash`: 暂存工作区所有未提交的修改（包括暂存的和非暂存的），默认不包含未跟踪的文件

  `git stash list`: 查看当前工作区暂存的修改目录

  `git stash pop`: 将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下

  `git stash apply stash@{0}`: 将指定缓存堆栈中的stash应用到工作目录中，默认是 stash@{0}，但不会自动删除

  `git stash drop stash@{0}`: 删除指定stash，默认为 stash@{0}

  `git stash clear`: 删除所有缓存的stash

  `git cherry-pick <commit id>`: 复制其他分支上但一个特定的提交到当前分支（常用于bug修改）

  `git remote (-v)`: 查看远程库的(详细)信息 

  `git rebase`: 可以把本地未push的分叉提交历史整理成直线

  `git tag <tagname> (<commit id>)`: 创建标签，默认为当前分支的当前版本；也可以指定 commit id。注意标签总是和commit挂钩，如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

  `git tag -a <tagname> -m <message> (<commit id>)`: 指定标签信息

  `git tag`: 查看所有标签

  `git show <tagname>`: 查看目标标签的信息

  `git push origin <tagname>`: 推送一个本地标签

  `git push origin --tags`: 推送全部未推送过的本地标签

  `git tag -d <tagname>`: 删除一个本地标签

  `git push origin :refs/tags/<tagname>`: 删除一个远程标签

  `git config --global alias.<user command> <command>`: 配置别名。每个仓库的git配置文件都放在.git/config文件中，当前用户的git配置文件放在用户主目录下的一个隐藏文件.gitconfig中。配置别名也可以直接修改这个文件。

  git st: `git config --global alias.st status`

  git co: `git config --global alias.co checkout`

  git ci: `git config --global alias.ci commit`

  git br: `git config --global alias.br branch`

  git lg: `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`
