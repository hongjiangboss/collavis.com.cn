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
        mainTitle: '产品页面',
        settingKey: 'PRODUCT',
        settingFields: [
                {
                        'type': 'upload',
                        'name': '列表页<br /><small>标题图</small>',
                        'key': 'product_title',
                        'default': '/assets/img/h2_tv_tit.gif',
                        'comment': '图片大小：360x24像素'
                },
                {
                        'type': 'upload',
                        'name': '详细页<br /><small>背景图</small>',
                        'key': 'product_image',
                        'default': '/assets/sample/product/MNT_1602253645417088.jpg',
                        'comment': '图片大小：980x324像素'
                }
        ]
})
