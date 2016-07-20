// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之配置文件
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../initialize.js')

module.exports = init.configure({
        name: 'Administrator',
        apiKey: '5a690d842935c51f26f473e025c1b97a',
        host: process.env.NODE_ENV === 'development' ? '192.128.11.105' : '101.201.65.181',
        port: 8000,
        masters: [8002, 8005, 8010, 8017, 8028],
        clientNum: 1,
        slideshows: 8,
        productPicture: 5,
        pageLimit: 12,
        tokenKey: '_token',
        mapKey: 'lGETtB6C3Cwn1bDITK6FiKR3S3LGed7o',
        routers: {
                '/authentication': 'routes/authentication',
                '/service': 'routes/service',
                '/': 'routes/routers'
        },
        lang: {
                init: 'zh-CN',
                locales: ['en', 'ja', 'zh', 'zh-CN'],
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
        session: {
                store: {
                        type: 'redis',
                        host: process.env.NODE_ENV === 'development' ? '192.128.11.102' : '127.0.0.1',
                        port: process.env.NODE_ENV === 'development' ? 6379 : 13796,
                        name: process.env.NODE_ENV === 'development' ? 0 : 2
                }
        },
        articleCategories: [
                { 'key': 'WEISHANG', 'name': '微商学院' },
                { 'key': 'CHUANGYE', 'name': '创业故事' },
                { 'key': 'DONGTAIS', 'name': '最新动态' },
                { 'key': 'MEISHENG', 'name': '女神向导' },
                { 'key': 'MEIJITV',  'name': '美肌TV'  }
        ]
}, __dirname)
