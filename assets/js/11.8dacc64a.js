(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{533:function(s,a,e){s.exports=e.p+"assets/img/keepalived_1.d03d347a.png"},534:function(s,a,e){s.exports=e.p+"assets/img/keepalived_2.5b11d9f0.png"},546:function(s,a,e){"use strict";e.r(a);var t=e(2),n=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"在线教程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在线教程"}},[s._v("#")]),s._v(" 在线教程")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://tengine.taobao.org/book/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Nginx开发从入门到精通"),a("OutboundLink")],1)])]),s._v(" "),a("h2",{attrs:{id:"nginx-keepalived实现高可用web-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx-keepalived实现高可用web-server"}},[s._v("#")]),s._v(" Nginx+Keepalived实现高可用Web Server")]),s._v(" "),a("h3",{attrs:{id:"keepalived介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived介绍"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://www.keepalived.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Keepalived"),a("OutboundLink")],1),s._v("介绍")]),s._v(" "),a("p",[s._v("是一个免费开源的，用C编写的类似于layer3, 4 & 7交换机制软件，具备我们平时说的第3层、第4层和第7层交换机的功能。主要提供loadbalancing（负载均衡）和 high-availability（高可用）功能，负载均衡实现需要依赖Linux的虚拟服务内核模块（ipvs），而高可用是通过VRRP协议实现多台机器之间的故障转移服务。")]),s._v(" "),a("p",[s._v("Keepalived软件起初是专门为LVS负载均衡软件设计的用来管理并监控LVS集群系统中各个服务节点的状态，后来又加入了可以实现高可用的VRRP功能。因此，Keepalived除了能够管理LVS软件外，还可以作为其他服务的高可用解决方案软件。")]),s._v(" "),a("p",[s._v("Keepalived软件主要是通过VRRP协议实现高可用功能的,VRRP出现的目的就是为了解决静态路由单点故障问题的。")]),s._v(" "),a("h3",{attrs:{id:"vrrp原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vrrp原理"}},[s._v("#")]),s._v(" "),a("a",{attrs:{href:"https://baike.baidu.com/item/%E8%99%9A%E6%8B%9F%E8%B7%AF%E7%94%B1%E5%99%A8%E5%86%97%E4%BD%99%E5%8D%8F%E8%AE%AE",target:"_blank",rel:"noopener noreferrer"}},[s._v("VRRP"),a("OutboundLink")],1),s._v("原理")]),s._v(" "),a("p",[s._v("VRRP(Virtual Router Redundancy Protocol)虚拟路由器冗余协议")]),s._v(" "),a("p",[a("img",{attrs:{src:e(533),alt:"VRRP"}})]),s._v(" "),a("p",[s._v("1.master在工作状态会不断群发一个广播包(内涵优先参数)")]),s._v(" "),a("p",[s._v("2.其他路由收到收到广播后会和自己的优先参数作对比,如果优先参数小于自己则什么都不执行,如果优先参数大于自己则开启争抢机制")]),s._v(" "),a("p",[s._v("3.如果启动了争抢机制,他就会群发自己的优先参数,最终优先参数最小的称为master路由.")]),s._v(" "),a("h3",{attrs:{id:"keepalived的三个核心模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived的三个核心模块"}},[s._v("#")]),s._v(" Keepalived的三个核心模块")]),s._v(" "),a("ul",[a("li",[s._v("core核心模块")]),s._v(" "),a("li",[s._v("check健康监测")]),s._v(" "),a("li",[s._v("vrrp虚拟路由冗余协议")])]),s._v(" "),a("h3",{attrs:{id:"keepalived服务的三个重要功能"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived服务的三个重要功能"}},[s._v("#")]),s._v(" Keepalived服务的三个重要功能")]),s._v(" "),a("ul",[a("li",[s._v("管理LVS")]),s._v(" "),a("li",[s._v("对LVS集群节点检查")]),s._v(" "),a("li",[s._v("作为系统网络服务的高可用功能")])]),s._v(" "),a("h3",{attrs:{id:"keepalived高可用故障切换转移原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived高可用故障切换转移原理"}},[s._v("#")]),s._v(" Keepalived高可用故障切换转移原理")]),s._v(" "),a("p",[s._v("在Keepalived服务正常工作时，主Master节点会不断地向备节点发送（多播的方式）心跳消息，用以告诉备Backup节点自己还活着，当主Master节点发生故障时，就无法发送心跳消息，备节点无法检测到来自主Master节点心跳了，于是调用自身的接管程序，接管主Master节点的IP资源及服务。而当主Master节点恢复时，备Backup节点又会释放主节点故障时自身接管的IP资源及服务，恢复到原来的备用角色。\n"),a("img",{attrs:{src:e(534),alt:"故障转移"}})]),s._v(" "),a("h3",{attrs:{id:"keepalived安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keepalived安装"}},[s._v("#")]),s._v(" Keepalived安装")]),s._v(" "),a("h4",{attrs:{id:"yum安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#yum安装"}},[s._v("#")]),s._v(" YUM安装")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("yum "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" keepalived\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"编辑主机配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编辑主机配置文件"}},[s._v("#")]),s._v(" 编辑主机配置文件")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[s._v("配置文件中virtual_ipaddress需替换成局域网段内不冲突的IP,主备VIP(虚IP)相同"),a("br"),s._v("\nVIP后添加 /24 dev (网卡名)")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /etc/keepalived/keepalived.conf\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" Configuration File "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" keepalived\n\nglobal_defs "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nvrrp_script check_nginx "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    script "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/usr/local/keepalived/shell/check_nginx.sh"')]),s._v("\n    interval "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n    weight "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-20")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nvrrp_instance VI_1 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    state MASTER\n    interface eth0\n    virtual_router_id "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("51")]),s._v("\n    priority "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v("\n    advert_int "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    authentication "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        auth_type PASS\n        auth_pass "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1111")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    virtual_ipaddress "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.100/24 dev eth0\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    track_script "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        check_nginx\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br")])]),a("h4",{attrs:{id:"编辑备机配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#编辑备机配置文件"}},[s._v("#")]),s._v(" 编辑备机配置文件")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[s._v("配置文件中virtual_ipaddress需替换成局域网段内不冲突的IP,主备VIP(虚IP)相同"),a("br"),s._v("\nVIP后添加 /24 dev (网卡名)"),a("br"),s._v("\n备机priority > 主机priority + weight")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /etc/keepalived/keepalived.conf\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("!")]),s._v(" Configuration File "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),s._v(" keepalived\n\nglobal_defs "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nvrrp_script check_nginx "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    script "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"/usr/local/keepalived/shell/check_nginx.sh"')]),s._v("\n    interval "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n    weight "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-20")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nvrrp_instance VI_1 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    state BACKUP\n    interface eth0\n    virtual_router_id "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("51")]),s._v("\n    priority "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("90")]),s._v("\n    advert_int "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n    authentication "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        auth_type PASS\n        auth_pass "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1111")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    virtual_ipaddress "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.100/24 dev eth0\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    track_script "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        check_nginx\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br")])]),a("h4",{attrs:{id:"分别在主备机编写检测脚本并赋权"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分别在主备机编写检测脚本并赋权"}},[s._v("#")]),s._v(" 分别在主备机编写检测脚本并赋权")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /usr/local/keepalived/shell/check_nginx.sh\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("count")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ps")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-C")]),s._v(" nginx --no-header "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wc")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-l")]),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("`")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("if")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("((")]),s._v(" $count "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("))")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("then")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("else")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exit")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("fi")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" +x /etc/keepalived/check_nginx.sh\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"配置keepalived日志独立记录文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置keepalived日志独立记录文件"}},[s._v("#")]),s._v(" 配置Keepalived日志独立记录文件")]),s._v(" "),a("p",[s._v("默认Keepalived日志记录在系统日志中/var/log/messages,不方便查看。")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /etc/sysconfig/keepalived\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("选项修改如下:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("KEEPALIVED_OPTIONS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"-D -d -S 0"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" /etc/rsyslog.conf\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("增加以下2行:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#keepalived")]),s._v("\nlocal0.*                                               /var/log/keepalived.log\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("重启日志同步服务")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" rsyslog restart\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h4",{attrs:{id:"启动nginx及keepalived"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动nginx及keepalived"}},[s._v("#")]),s._v(" 启动Nginx及Keepalived")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("/usr/local/nginx/sbin/nginx\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" keepalived start\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("h3",{attrs:{id:"vip漂移验证"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vip漂移验证"}},[s._v("#")]),s._v(" VIP漂移验证")]),s._v(" "),a("p",[s._v("正常情况下VIP绑定在主机网卡，主机上运行:")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ip")]),s._v(" addr"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.100\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("主机能够看到如下信息，而备机上没有")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    inet "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.100/24 brd "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.255 scope global secondary noprefixroute eth0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("模拟异常，以下操作都可以")]),s._v(" "),a("ul",[a("li",[s._v("关闭主机")]),s._v(" "),a("li",[s._v("主机断网 (service network stop)")]),s._v(" "),a("li",[s._v("关闭主机Keepalived (service keepalived stop)")]),s._v(" "),a("li",[s._v("关闭主机Nginx (/usr/local/nginx/sbin/nginx -s stop)")])]),s._v(" "),a("p",[s._v("VIP自动漂移，备机能够看到如下信息，而主机上没有")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("    inet "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.100/24 brd "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10.211")]),s._v(".55.255 scope global secondary noprefixroute eth0\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("通过虚IP访问URL时，也可以看到流量进入的备机Nginx"),a("br"),s._v("\n模拟异常后，手动恢复主机系统、网络及Keepalived和Nginx后，VIP重新漂移回主机")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[s._v("模拟异常时，前3种(关机、断网、关闭主机Keepalived)VIP能实时漂移，关闭主机Nginx操作漂移时长取决于监控脚本的运行间隔(主机配置文件中的interval字段)")])]),a("h3",{attrs:{id:"vip漂移条件分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vip漂移条件分析"}},[s._v("#")]),s._v(" VIP漂移条件分析")]),s._v(" "),a("ul",[a("li",[s._v("主机Keepalived服务不具备条件向备机及时发送心跳(断网、宕机等)")]),s._v(" "),a("li",[s._v("由于健康检查脚本执行结果不为0，造成主机权值下降(priority = priority + weight)，且低于备机priority")])]),s._v(" "),a("h3",{attrs:{id:"集群整体可用条件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#集群整体可用条件"}},[s._v("#")]),s._v(" 集群整体可用条件")]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[s._v("备机可以有多台，数量越多集群整体可用性越高")])]),a("ul",[a("li",[s._v("包含主机或者所有备机在内，只要其中有一台服务器上的Keepalived+Nginx都是可用的，则集群整体可用")])]),s._v(" "),a("h3",{attrs:{id:"使用场景扩展"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用场景扩展"}},[s._v("#")]),s._v(" 使用场景扩展")]),s._v(" "),a("ul",[a("li",[s._v("除Nginx高可用外，还可用于其他场景，如Redis、MySQL、其他WebServer，或者自己开发的网络服务")]),s._v(" "),a("li",[s._v("针对Nginx场景，上述流程仅监测Nginx进程状态，大家可自定义健康检查脚本，结合curl等命令可进行URL级别的健康检查")])]),s._v(" "),a("h3",{attrs:{id:"扩展阅读"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#扩展阅读"}},[s._v("#")]),s._v(" 扩展阅读")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://www.keepalived.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Keepalived官网"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://www.keepalived.org/doc/index.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("Keepalived官方文档"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=n.exports}}]);