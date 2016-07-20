// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之电商渠道
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

module.exports = common.Settings({
        mainTitle: '电商渠道',
        settingKey: 'MALL',
        settingFields: [
                {
                        'name': '左侧链接',
                        'key': 'left_href',
                        'comment': ''
                },
                {
                        'type': 'upload',
                        'name': '左侧图片',
                        'key': 'left_img1',
                        'comment': '图片大小：485x315像素',
                        'default': '/assets/img/btn_shop-jd.jpg'
                },
                {
                        'type': 'upload',
                        'name': '左侧图片<br/><small>(点击状态下)</small>',
                        'key': 'left_img2',
                        'comment': '图片大小：485x315像素',
                        'default': '/assets/img/btn_shop-jd_on.jpg'
                },
                {
                        'name': '右侧链接',
                        'key': 'right_href',
                        'comment': ''
                },
                {
                        'type': 'upload',
                        'name': '右侧图片',
                        'key': 'right_img1',
                        'comment': '图片大小：485x315像素',
                        'default': '/assets/img/btn_shop-jd.jpg'
                },
                {
                        'type': 'upload',
                        'name': '右侧图片<br/><small>(点击状态下)</small>',
                        'key': 'right_img2',
                        'comment': '图片大小：485x315像素',
                        'default': '/assets/img/btn_shop-jd_on.jpg'
                }
        ]
})
