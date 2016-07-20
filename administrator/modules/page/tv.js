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
        mainTitle: '美肌TV',
        settingKey: 'TV',
        settingFields: [
                {
                        'type': 'upload',
                        'name': '标题图',
                        'key': 'tv_title',
                        'default': '/assets/img/h2_tv_tit.gif',
                        'comment': '图片大小：360x24像素'
                },
                {
                        'type': 'upload',
                        'name': '广告图',
                        'key': 'tv_image',
                        'default': '/assets/sample/product/MNT_1602253645417088.jpg',
                        'comment': '图片大小：980x324像素'
                },
                {
                        'name': '广告链接',
                        'key': 'tv_href'
                }
        ]
})
