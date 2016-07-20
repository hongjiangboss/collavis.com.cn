// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之首页设置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')


module.exports = common.Settings({
        mainTitle: '首页页面',
        settingKey: 'HOME',
        tabs: [
                {
                        'name': '封面图片',
                        'href': '/page/home' + init.settings.extname,
                        'active': 'active'
                },
                {
                        'name': '广告图片',
                        'href': '/page/slideshows' + init.settings.extname
                }
        ],
        settingFields: [
                {
                        'name': '产品图片<small>左上角</small><br/><small>（链接地址）</small>',
                        'key': 'lefttop_href'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>左上角</small><br/><small>（背景图片）</small>',
                        'key': 'lefttop_img',
                        'default': '/assets/sample/MNT1601059783757423.gif'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>左上角</small><br/><small>（文字图片）</small>',
                        'key': 'lefttop_text',
                        'default': '/assets/sample/MNT1601059783757423.gif'
                },

                {
                        'name': '产品图片<small>左下角</small><br/><small>（链接地址）</small>',
                        'key': 'leftbottom_href'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>左下角</small><br/><small>（背景图片）</small>',
                        'key': 'leftbottom_img',
                        'default': '/assets/sample/MNT1601059784096163.gif'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>左下角</small><br/><small>（文字图片）</small>',
                        'key': 'leftbottom_text',
                        'default': '/assets/sample/MNT1601059784096163.gif'
                },

                {
                        'name': '产品图片<small>右下角</small><br/><small>（链接地址）</small>',
                        'key': 'leftbottom2_href'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>右下角</small><br/><small>（背景图片）</small>',
                        'key': 'leftbottom2_img',
                        'default': '/assets/sample/MNT_1601059784374413.gif'
                },
                {
                        'type': 'upload',
                        'name': '产品图片<small>右下角</small><br/><small>（文字图片）</small>',
                        'key': 'leftbottom2_text',
                        'default': '/assets/sample/tx_img3.png'
                },

                {
                        'type': 'upload',
                        'name': '女神向导<br/><small>（背景图片）</small>',
                        'key': 'right_img',
                        'default': '/assets/sample/MNT_1512238622386584.gif'
                },
                {
                        'type': 'upload',
                        'name': '女神向导<br/><small>（文字图片）</small>',
                        'key': 'right_text',
                        'default': '/assets/sample/tx_img2.png'
                },

                {
                        'type': 'upload',
                        'name': '美肌TV<br/><small>（背景图片）</small>',
                        'key': 'bottom_img',
                        'default': '/assets/sample/MNT_1512216631774178.jpg'
                },
                {
                        'type': 'upload',
                        'name': '美肌TV<br/><small>（文字图片）</small>',
                        'key': 'bottom_text',
                        'default': '/assets/sample/tx_text.png'
                }
        ]
})
