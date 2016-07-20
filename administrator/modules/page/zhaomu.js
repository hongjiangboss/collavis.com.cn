// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之招募政策页面设置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

module.exports = common.Settings({
        mainTitle: '招募政策',
        settingKey: 'ZHAOMU',
        settingFields: [
                {
                        'type': 'upload',
                        'name': '主图片',
                        'key': 'largeimg',
                        'default': '/assets/sample/BEAUTY_1603292191562798.jpg',
                        'comment': '图片宽度：980像素'
                }
        ]
})
