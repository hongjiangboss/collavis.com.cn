// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之SEO设置页面
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

module.exports = common.Settings({
        mainTitle: 'SEO设置',
        settingKey: 'SEO',
        settingFields: [
                {
                        name: '网站名称',
                        key: 'homeTitle',
                        comment: ''
                },
                {
                        name: '标题栏',
                        key: 'siteTitle',
                        comment: ''
                },
                {
                        name: '域名',
                        key: 'siteAuthor',
                        comment: ''
                },
                {
                        name: '版权说明',
                        key: 'siteCopyright',
                        comment: ''
                },
                {
                        name: '公司名称',
                        key: 'footerCompany',
                        comment: ''
                },
                {
                        name: '联系方式',
                        key: 'footerCopyright',
                        comment: ''
                },
                {
                        name: 'SEO关键词',
                        key: 'siteKeyword',
                        comment: ''
                },
                {
                        name: 'SEO描述',
                        key: 'siteDescription',
                        comment: ''
                }
        ]
})
