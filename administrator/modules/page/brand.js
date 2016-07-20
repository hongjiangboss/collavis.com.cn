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
        mainTitle: '品牌介绍',
        settingKey: 'BRAND',
        settingFields: [
                {
                        'type': 'upload',
                        'name': '第一层图片<br><small>顶部图片</small>',
                        'key': 'first_top',
                        'default': '/assets/sample/brand/brand1.jpg',
                        'comment': '图片大小：1200x530像素'
                },
                {
                        'type': 'upload',
                        'name': '第一层图片<br><small>左下图片</small>',
                        'key': 'first_bottom_left',
                        'default': '/assets/sample/brand/br_img1_1.png',
                        'comment': '图片大小：215x375像素'
                },
                {
                        'type': 'upload',
                        'name': '第一层图片<br><small>右下图片</small>',
                        'key': 'first_bottom_right',
                        'default': '/assets/sample/brand/br_img1_2.png',
                        'comment': '图片大小：305x202像素'
                },

                {
                        'type': 'upload',
                        'name': '第二层图片<br><small>左侧图片</small>',
                        'key': 'second_left',
                        'default': '/assets/sample/brand/br_img2_1.png',
                        'comment': '图片大小：980x647像素'
                },
                {
                        'type': 'upload',
                        'name': '第二层图片<br><small>右侧图片</small>',
                        'key': 'second_right',
                        'default': '/assets/sample/brand/br_img2_2.png',
                        'comment': '图片大小：390x144像素'
                },

                {
                        'type': 'upload',
                        'name': '第三层图片<br><small>左侧图片</small>',
                        'key': 'third_left',
                        'default': '/assets/sample/brand/br_img2_3.png',
                        'comment': '图片大小：495x763像素'
                },
                {
                        'type': 'upload',
                        'name': '第三层图片<br><small>右侧图片</small>',
                        'key': 'third_right',
                        'default': '/assets/sample/brand/br_img2_4.png',
                        'comment': '图片大小：476x534像素'
                },

                {
                        'type': 'upload',
                        'name': '第四层图片<br><small>左侧图片</small>',
                        'key': 'fourth_left',
                        'default': '/assets/sample/brand/br_img3_1.png',
                        'comment': '图片大小：980x592像素'
                },
                {
                        'type': 'upload',
                        'name': '第四层图片<br><small>右侧图片</small>',
                        'key': 'fourth_right',
                        'default': '/assets/sample/brand/br_img3_2.png',
                        'comment': '图片大小：980x499像素'
                },
        ]
})
