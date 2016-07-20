// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 主應用服務之配置文件
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../initialize.js')

module.exports = init.configure({
        name: 'www',
        port: 3000,
        masters: [3002, 3005, 3010, 3017, 3028],
        extname: '.html',
        slideshows: 8,
        pageLimit: 12,
        mapKey: 'lGETtB6C3Cwn1bDITK6FiKR3S3LGed7o',
        routers: {
                '/':            'routes/routers',
                '/en':          'routes/main',
                '/ja':          'routes/main',
                '/zh':          'routes/main',
                '/zh-CN':       'routes/main'
        },
        lang: {
                init: 'zh-CN',
                enables: ['zh-CN', 'zh'],
                locales: ['en', 'zh-CN', 'zh', 'ja'],
                keyword: {
                        'en':           'English',
                        'ja':           '日語',
                        'zh':           '繁體中文',
                        'zh-CN':        '简体中文'
                }
        },
        db: {
                type: 'arangodb',
                host: process.env.NODE_ENV === 'development' ? '192.128.11.102' : '127.0.0.1',
                port: process.env.NODE_ENV === 'development' ? 8529 : 48319,
                user: 'root',
                pass: process.env.NODE_ENV === 'development' ? '1qazxsw2' : '02A3edD5',
                name: process.env.NODE_ENV === 'development' ? '_system' : 'collavis'
        },
        articleCategories: {
                'WEISHANG': '微商学院',
                'CHUANGYE': '创业故事',
                'DONGTAIS': '最新动态',
                'MEISHENG': '女神向导',
                'MEIJITV':  '美肌TV'
        }
}, __dirname)
