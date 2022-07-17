(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{280:function(t,e,s){"use strict";s.r(e);var i=s(13),v=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h3",{attrs:{id:"git-command"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-command"}},[t._v("#")]),t._v(" Git command")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://docs.github.com/en/github",target:"_blank",rel:"noopener noreferrer"}},[t._v("Github Docs"),e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("启用编辑：i")]),t._v(" "),e("p",[t._v("退出编辑：ESC / q, 然后输入 :wq 保存并退出")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("git install")]),t._v(" "),e("p",[t._v("mac 终端下 git 集成在 xcode 下，但是 xcode 非常大，可通过以下命令只安装 git。")]),t._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("xcode-select "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br")])])]),t._v(" "),e("li",[e("p",[t._v("git 加速")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("常规的修改系统 host 配置，有提升但有限。")])]),t._v(" "),e("li",[e("p",[t._v("配置ip后 git clone 仍很慢的方法（以lodash为例）：")])])]),t._v(" "),e("p",[t._v("将原地址（注意修改npm镜像 nrm use cnpm / taobao）")]),t._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/lodash/lodash.git\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("改为")]),t._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com.cnpmjs.org/lodash/lodash.git\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])])]),t._v(" "),e("li",[e("p",[t._v("设置ssh")]),t._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[t._v("$ ssh-keygen -t rsa -C "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"youremail@example.com"')]),t._v("\nentry password\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("done")]),t._v("\n\n// 查看公钥\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" ~/.ssh\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v("\n  authorized_keys2  id_dsa       known_hosts\n  config            id_dsa.pub\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("cat")]),t._v(" ~/.ssh/id_rsa.pub\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br")])])]),t._v(" "),e("li",[e("p",[t._v("Commands")]),t._v(" "),e("ul",[e("li",[e("p",[e("code",[t._v("git init")]),t._v(": 初始化 git 仓库")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git add <file>")]),t._v(": 提交一次变更到本地仓库-暂存区(.git目录)")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git add .")]),t._v(": 提交当前所有变更文件到暂存区")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git commit -m <message>")]),t._v(": 提交本地暂存区变更到当前分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git log --graph --pretty=oneline")]),t._v(": 单行显示提交日志 "),e("code",[t._v("--graph")]),t._v("显示分支合并图")]),t._v(" "),e("p",[t._v("每次提交都会创建一个"),e("code",[t._v("commit id")]),t._v("即版本号，git用"),e("code",[t._v("HEAD")]),t._v("表示当前版本，"),e("code",[t._v("HEAD^")]),t._v("表示上一个版本... "),e("code",[t._v("HEAD~100")]),t._v("表示前100个版本。")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git reflog")]),t._v(": 查看命令历史")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git reset --hard HEAD^")]),t._v(": 回退至上一个版本")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git reset --hard 1094e")]),t._v(": 回退至"),e("code",[t._v("commit id")]),t._v("以"),e("code",[t._v("1094e")]),t._v("开头的特定版本，版本号不用写全（5-7位即可）")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git reset HEAD <file>")]),t._v(": 撤销已提交至暂存区"),e("code",[t._v("git add")]),t._v("的文件修改")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git checkout -- <file>")]),t._v(": 撤销修改，让目标文件回到最近一次"),e("code",[t._v("git commit")]),t._v("或"),e("code",[t._v("git add")]),t._v("时的状态")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git rm <file>")]),t._v(": 删除文件")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git remote add origin git@github.com:user/learngit.git")]),t._v(": 关联远程仓库origin")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git push (-u) origin master/dev")]),t._v(": 将master/dev分支推送至远程仓库, "),e("code",[t._v("-u")]),t._v("首次推送将本地的master/dev分支和远程的master/dev分支关联起来，在以后的推送或者拉取时就可以省略")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git clone ssh / https")]),t._v(": 克隆远程仓库")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git checkout -b dev")]),t._v("、"),e("code",[t._v("git switch -c dev")]),t._v(": 创建并切换至dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git branch dev")]),t._v(": 创建dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git branch")]),t._v(": 查看所有分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git branch -d dev")]),t._v(": 删除已合并的dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git branch -D dev")]),t._v(": 强行删除未合并的dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git push origin --delete dev")]),t._v(": 删除远程dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git checkout dev")]),t._v("、"),e("code",[t._v("git switch dev")]),t._v(": 切换至dev分支")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git merge dev")]),t._v(": 合并指定分支到当前分支，合并是“快进模式”，也就是直接把master指向dev的当前提交")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git status")]),t._v(": 查看当前版本库状态")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash")]),t._v(": 暂存工作区所有未提交的修改（包括暂存的和非暂存的），默认不包含未跟踪的文件")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash list")]),t._v(": 查看当前工作区暂存的修改目录")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash pop")]),t._v(": 将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash apply stash@{0}")]),t._v(": 将指定缓存堆栈中的stash应用到工作目录中，默认是 stash@{0}，但不会自动删除")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash drop stash@{0}")]),t._v(": 删除指定stash，默认为 stash@{0}")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git stash clear")]),t._v(": 删除所有缓存的stash")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git cherry-pick <commit id>")]),t._v(": 复制其他分支上但一个特定的提交到当前分支（常用于bug修改）")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git remote (-v)")]),t._v(": 查看远程库的(详细)信息")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git rebase")]),t._v(": 可以把本地未push的分叉提交历史整理成直线")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git tag <tagname> (<commit id>)")]),t._v(": 创建标签，默认为当前分支的当前版本；也可以指定 commit id。注意标签总是和commit挂钩，如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git tag -a <tagname> -m <message> (<commit id>)")]),t._v(": 指定标签信息")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git tag")]),t._v(": 查看所有标签")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git show <tagname>")]),t._v(": 查看目标标签的信息")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git push origin <tagname>")]),t._v(": 推送一个本地标签")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git push origin --tags")]),t._v(": 推送全部未推送过的本地标签")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git tag -d <tagname>")]),t._v(": 删除一个本地标签")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git push origin :refs/tags/<tagname>")]),t._v(": 删除一个远程标签")])]),t._v(" "),e("li",[e("p",[e("code",[t._v("git config --global alias.<user command> <command>")]),t._v(": 配置别名\n每个仓库的git配置文件都放在.git/config文件中，当前用户的git配置文件放在用户主目录下的一个隐藏文件.gitconfig中。配置别名也可以直接修改这个文件。")]),t._v(" "),e("ul",[e("li",[t._v("git st: "),e("code",[t._v("git config --global alias.st status")])]),t._v(" "),e("li",[t._v("git co: "),e("code",[t._v("git config --global alias.co checkout")])]),t._v(" "),e("li",[t._v("git ci: "),e("code",[t._v("git config --global alias.ci commit")])]),t._v(" "),e("li",[t._v("git br: "),e("code",[t._v("git config --global alias.br branch")])]),t._v(" "),e("li",[t._v("git lg: "),e("code",[t._v("git config --global alias.lg \"log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit\"")])])])])])])])])}),[],!1,null,null,null);e.default=v.exports}}]);