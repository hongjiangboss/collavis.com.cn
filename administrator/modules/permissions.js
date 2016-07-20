// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 根據管理員權限獲取操作面板之菜單數據
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')

module.exports = function (administrator, fn) {
        var menu = [
                {
                        'name': '控制台面板',
                        'icon': 'ti-dashboard',
                        'iconStyle': '',
                        'tip': '控制台面板',
                        'items': [
                                {
                                        'name': '首页',
                                        'href': init.urlpath('/home/homepage'),
                                        'tip': ''
                                }
                        ]
                },
                {
                        'name': '文章管理',
                        'icon': 'ti-pin-alt',
                        'iconStyle': '',
                        'tip': '文章管理',
                        'items': [
                                {
                                        'name': '新建文章',
                                        'href': init.urlpath('/article/add'),
                                        'tip': ''
                                },
                                {
                                        'name': '文章列表',
                                        'href': init.urlpath('/article/article'),
                                        'tip': ''
                                }
                        ]
                },
                {
                        'name': '页面管理',
                        'icon': 'ti-book',
                        'iconStyle': '',
                        'tip': '页面管理',
                        'items': [
                                {
                                        'name': '首页页面',
                                        'href': init.urlpath('/page/home'),
                                        'tip': ''
                                },
                                {
                                        'name': '招募政策',
                                        'href': init.urlpath('/page/zhaomu'),
                                        'tip': ''
                                },
                                {
                                        'name': '电商渠道',
                                        'href': init.urlpath('/page/mall'),
                                        'tip': ''
                                },
                                {
                                        'name': '品牌介绍',
                                        'href': init.urlpath('/page/brand'),
                                        'tip': ''
                                },
                                {
                                        'name': '会社案内',
                                        'href': init.urlpath('/page/org'),
                                        'tip': ''
                                },
                                {
                                        'name': '女神向导',
                                        'href': init.urlpath('/page/guide'),
                                        'tip': ''
                                },
                                {
                                        'name': '美肌TV',
                                        'href': init.urlpath('/page/tv'),
                                        'tip': ''
                                },
                                {
                                        'name': '产品页面',
                                        'href': init.urlpath('/page/product'),
                                        'tip': ''
                                },
                                {
                                        'name': 'SEO设置',
                                        'href': init.urlpath('/page/seo'),
                                        'tip': ''
                                }
                        ]
                },
                {
                        'name': '产品管理',
                        'icon': 'ti-shopping-cart',
                        'iconStyle': '',
                        'tip': '产品管理',
                        'items': [
                                {
                                        'name': '产品信息',
                                        'href': init.urlpath('/product/product'),
                                        'tip': ''
                                },
                                {
                                        'name': '产品分类',
                                        'href': init.urlpath('/product/category'),
                                        'tip': ''
                                },
                                {
                                        'name': '代理授权',
                                        'href': init.urlpath('/product/grant'),
                                        'tip': ''
                                },
                                {
                                        'name': '店铺信息',
                                        'href': init.urlpath('/product/shop'),
                                        'tip': ''
                                }
                        ]
                }
        ]
        fn(menu, administrator)
}
