


## 部分截图

### 登录注册
![](https://github.com/BYChoo/record/blob/master/static/show/start.gif)
![](https://github.com/BYChoo/record/blob/master/static/show/5.gif)

### 导入csv文件，登记缺勤学生，查看缺勤学生
![](https://github.com/BYChoo/record/blob/master/static/show/1.gif)
![](https://github.com/BYChoo/record/blob/master/static/show/2.gif)
![](https://github.com/BYChoo/record/blob/master/static/show/4.gif)

## 项目布局
```
.
├── api                                         // 服务器逻辑处理
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   ├── calendar.vue                        // 日历组件
│   │   ├── check_work.vue                      // 查看缺勤组件
│   │   ├── cls_call.vue                        // 登记缺勤组件
│   │   ├── import_roster.vue                   // 导入组件
│   │   ├── login.vue                           // 租金组件
│   │   ├── register.vue                        // 注册组件
│   │   ├── restor.vue                          // 列表组件
│   │   ├── select_cls.vue                      // 选择班级组件
│   │   ├── select_restor.vue                   // 查看班级组件
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── store                                   // vuex的状态管理
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   └── App.vue                                 // 页面入口文件
├── static                                      // 静态资源
│   ├── css                                     // css文件
│   ├── file                                    // 上传的csv文件
│   ├── fonts                                   // 字体图标
├── index.html                                  // 入口html文件
.
```
