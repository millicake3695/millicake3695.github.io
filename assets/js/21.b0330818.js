(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{352:function(s,t,e){"use strict";e.r(t);var a=e(12),v=Object(a.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"git-command"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-command"}},[s._v("#")]),s._v(" Git command")]),s._v(" "),t("p",[t("a",{attrs:{href:"https://docs.github.com/en/github",target:"_blank",rel:"noopener noreferrer"}},[s._v("Github Docs"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("启用编辑：i")]),s._v(" "),t("p",[s._v("退出编辑：ESC / q, 然后输入 :wq 保存并退出")]),s._v(" "),t("h3",{attrs:{id:"git-install"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-install"}},[s._v("#")]),s._v(" git install")]),s._v(" "),t("p",[s._v("mac 终端下 git 集成在 xcode 下，但是 xcode 非常大，可通过以下命令只安装 git。")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("xcode-select "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" init\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"git-加速"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#git-加速"}},[s._v("#")]),s._v(" git 加速")]),s._v(" "),t("p",[s._v("常规的修改系统 host 配置，有提升但有限。")]),s._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),t("p",[s._v("macOS hosts文件位置："),t("code",[s._v("/etc/hosts")])]),s._v(" "),t("p",[s._v("(1) 首先，打开（访达）Finder。"),t("br"),s._v("\n(2) 使用组合键"),t("code",[s._v("Shift+Command+G")]),s._v('打开"前往文件夹"，输入框中输入'),t("code",[s._v("/etc/hosts")])]),s._v(" "),t("p",[s._v("Windows hosts文件位置："),t("code",[s._v("C:/windows/system32/drivers/etc/hosts")])])]),s._v(" "),t("p",[s._v("配置ip后 git clone 仍很慢的方法（以lodash为例）：")]),s._v(" "),t("p",[s._v("将原地址（注意修改npm镜像 nrm use cnpm / taobao）")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/lodash/lodash.git\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("改为")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com.cnpmjs.org/lodash/lodash.git\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"刷新dns缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#刷新dns缓存"}},[s._v("#")]),s._v(" 刷新DNS缓存")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("// Mac用户\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("killall")]),s._v(" -HUP mDNSResponder\n\n// Win\nipconfig /flushdns\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h3",{attrs:{id:"设置ssh"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#设置ssh"}},[s._v("#")]),s._v(" 设置ssh")]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("$ ssh-keygen -t rsa -C "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"youremail@example.com"')]),s._v("\nentry password\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n\n// 查看公钥\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~/.ssh\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\n  authorized_keys2  id_dsa       known_hosts\n  config            id_dsa.pub\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" ~/.ssh/id_rsa.pub\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h3",{attrs:{id:"commands"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#commands"}},[s._v("#")]),s._v(" Commands")]),s._v(" "),t("p",[t("code",[s._v("git init")]),s._v(": 初始化 git 仓库")]),s._v(" "),t("p",[t("code",[s._v("git add <file>")]),s._v(": 提交一次变更到本地仓库-暂存区(.git目录)")]),s._v(" "),t("p",[t("code",[s._v("git add .")]),s._v(": 提交当前所有变更文件到暂存区")]),s._v(" "),t("p",[t("code",[s._v("git commit -m <message>")]),s._v(": 提交本地暂存区变更到当前分支")]),s._v(" "),t("p",[t("code",[s._v("git log --graph --pretty=oneline")]),s._v(": 单行显示提交日志 "),t("code",[s._v("--graph")]),s._v("显示分支合并图。每次提交都会创建一个"),t("code",[s._v("commit id")]),s._v("即版本号，git用"),t("code",[s._v("HEAD")]),s._v("表示当前版本，"),t("code",[s._v("HEAD^")]),s._v("表示上一个版本... "),t("code",[s._v("HEAD~100")]),s._v("表示前100个版本。")]),s._v(" "),t("p",[t("code",[s._v("git reflog")]),s._v(": 查看命令历史")]),s._v(" "),t("p",[t("code",[s._v("git reset --hard HEAD^")]),s._v(": 回退至上一个版本")]),s._v(" "),t("p",[t("code",[s._v("git reset --hard 1094e")]),s._v(": 回退至"),t("code",[s._v("commit id")]),s._v("以"),t("code",[s._v("1094e")]),s._v("开头的特定版本，版本号不用写全（5-7位即可）")]),s._v(" "),t("p",[t("code",[s._v("git reset HEAD <file>")]),s._v(": 撤销已提交至暂存区"),t("code",[s._v("git add")]),s._v("的文件修改")]),s._v(" "),t("p",[t("code",[s._v("git checkout -- <file>")]),s._v(": 撤销修改，让目标文件回到最近一次"),t("code",[s._v("git commit")]),s._v("或"),t("code",[s._v("git add")]),s._v("时的状态")]),s._v(" "),t("p",[t("code",[s._v("git rm <file>")]),s._v(": 删除文件")]),s._v(" "),t("p",[t("code",[s._v("git remote add origin git@github.com:user/learngit.git")]),s._v(": 关联远程仓库origin")]),s._v(" "),t("p",[t("code",[s._v("git push (-u) origin master/dev")]),s._v(": 将master/dev分支推送至远程仓库, "),t("code",[s._v("-u")]),s._v("首次推送将本地的master/dev分支和远程的master/dev分支关联起来，在以后的推送或者拉取时就可以省略")]),s._v(" "),t("p",[t("code",[s._v("git clone ssh / https")]),s._v(": 克隆远程仓库")]),s._v(" "),t("p",[t("code",[s._v("git checkout -b dev")]),s._v("、"),t("code",[s._v("git switch -c dev")]),s._v(": 创建并切换至dev分支")]),s._v(" "),t("p",[t("code",[s._v("git branch dev")]),s._v(": 创建dev分支")]),s._v(" "),t("p",[t("code",[s._v("git branch")]),s._v(": 查看所有分支")]),s._v(" "),t("p",[t("code",[s._v("git branch -d dev")]),s._v(": 删除已合并的dev分支")]),s._v(" "),t("p",[t("code",[s._v("git branch -D dev")]),s._v(": 强行删除未合并的dev分支")]),s._v(" "),t("p",[t("code",[s._v("git push origin --delete dev")]),s._v(": 删除远程dev分支")]),s._v(" "),t("p",[t("code",[s._v("git checkout dev")]),s._v("、"),t("code",[s._v("git switch dev")]),s._v(": 切换至dev分支")]),s._v(" "),t("p",[t("code",[s._v("git merge dev")]),s._v(": 合并指定分支到当前分支，合并是“快进模式”，也就是直接把master指向dev的当前提交")]),s._v(" "),t("p",[t("code",[s._v("git status")]),s._v(": 查看当前版本库状态")]),s._v(" "),t("p",[t("code",[s._v("git stash")]),s._v(": 暂存工作区所有未提交的修改（包括暂存的和非暂存的），默认不包含未跟踪的文件")]),s._v(" "),t("p",[t("code",[s._v("git stash list")]),s._v(": 查看当前工作区暂存的修改目录")]),s._v(" "),t("p",[t("code",[s._v("git stash pop")]),s._v(": 将缓存堆栈中的第一个stash删除，并将对应修改应用到当前的工作目录下")]),s._v(" "),t("p",[t("code",[s._v("git stash apply stash@{0}")]),s._v(": 将指定缓存堆栈中的stash应用到工作目录中，默认是 stash@{0}，但不会自动删除")]),s._v(" "),t("p",[t("code",[s._v("git stash drop stash@{0}")]),s._v(": 删除指定stash，默认为 stash@{0}")]),s._v(" "),t("p",[t("code",[s._v("git stash clear")]),s._v(": 删除所有缓存的stash")]),s._v(" "),t("p",[t("code",[s._v("git cherry-pick <commit id>")]),s._v(": 复制其他分支上但一个特定的提交到当前分支（常用于bug修改）")]),s._v(" "),t("p",[t("code",[s._v("git remote (-v)")]),s._v(": 查看远程库的(详细)信息")]),s._v(" "),t("p",[t("code",[s._v("git rebase")]),s._v(": 可以把本地未push的分叉提交历史整理成直线")]),s._v(" "),t("p",[t("code",[s._v("git tag <tagname> (<commit id>)")]),s._v(": 创建标签，默认为当前分支的当前版本；也可以指定 commit id。注意标签总是和commit挂钩，如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。")]),s._v(" "),t("p",[t("code",[s._v("git tag -a <tagname> -m <message> (<commit id>)")]),s._v(": 指定标签信息")]),s._v(" "),t("p",[t("code",[s._v("git tag")]),s._v(": 查看所有标签")]),s._v(" "),t("p",[t("code",[s._v("git show <tagname>")]),s._v(": 查看目标标签的信息")]),s._v(" "),t("p",[t("code",[s._v("git push origin <tagname>")]),s._v(": 推送一个本地标签")]),s._v(" "),t("p",[t("code",[s._v("git push origin --tags")]),s._v(": 推送全部未推送过的本地标签")]),s._v(" "),t("p",[t("code",[s._v("git tag -d <tagname>")]),s._v(": 删除一个本地标签")]),s._v(" "),t("p",[t("code",[s._v("git push origin :refs/tags/<tagname>")]),s._v(": 删除一个远程标签")]),s._v(" "),t("p",[t("code",[s._v("git config --global alias.<user command> <command>")]),s._v(": 配置别名。每个仓库的git配置文件都放在.git/config文件中，当前用户的git配置文件放在用户主目录下的一个隐藏文件.gitconfig中。配置别名也可以直接修改这个文件。")]),s._v(" "),t("p",[s._v("git st: "),t("code",[s._v("git config --global alias.st status")])]),s._v(" "),t("p",[s._v("git co: "),t("code",[s._v("git config --global alias.co checkout")])]),s._v(" "),t("p",[s._v("git ci: "),t("code",[s._v("git config --global alias.ci commit")])]),s._v(" "),t("p",[s._v("git br: "),t("code",[s._v("git config --global alias.br branch")])]),s._v(" "),t("p",[s._v("git lg: "),t("code",[s._v("git config --global alias.lg \"log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit\"")])])])}),[],!1,null,null,null);t.default=v.exports}}]);