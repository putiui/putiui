// import lazy from './lazy'; export default [  {     name: 'GuideCustom',     path: '/zh-CN/guide-custom',     component: lazy('./views/report/zh-CN/GuideCustom'),     meta: {"category":"Guide","order":"1","title":"定制化"} },  {     name: 'GuideInstall',     path: '/zh-CN/guide-install',     component: lazy('./views/report/zh-CN/GuideInstall'),     meta: {"category":"Guide","order":"1","title":"安装"} },  {     name: 'GuideQuickstart',     path: '/zh-CN/guide-quickstart',     component: lazy('./views/report/zh-CN/GuideQuickstart'),     meta: {"category":"Guide","order":"1","title":"快速上手"} },  {     name: 'ComponentButton',     path: '/zh-CN/component-button',     component: lazy('./views/report/zh-CN/ComponentButton'),     meta: {"category":"Component","order":"1","type":"General","title":"Button","subtitle":"按钮"} },  {     name: 'ComponentMenu',     path: '/zh-CN/component-menu',     component: lazy('./views/report/zh-CN/ComponentMenu'),     meta: {"category":"Component","order":"1","type":"Navigation","title":"Menu","subtitle":"菜单"} }  ]
