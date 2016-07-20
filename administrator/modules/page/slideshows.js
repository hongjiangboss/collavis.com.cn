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

var settingFields = []
for (let i = 0; i < init.settings.slideshows; i++) {
        settingFields.push({
                'name': '第' + (i + 1) + '张图片<br><small>链接地址</small>',
                'key': i + '_href'
        })

        var image = {
                'type': 'upload',
                'name': '第' + (i + 1) + '张图片<br><small>背景图片</small>',
                'key': i + '_image',
                'default': '',
                'comment': '图片大小：980x694像素'
        }

        var bgcolor = {
                'name': '第' + (i + 1) + '张图片<br><small>背景颜色</small>',
                'key': i + '_bgcolor',
                'default': ''
        }

        switch (i) {
                case 0:
                        image['default'] = '/assets/sample/MNT_1512293716959289.jpg'
                        bgcolor['default'] = 'rgb(255, 94, 131)'
                        break

                case 1:
                        image['default'] = '/assets/sample/MNT_1512293717305831.jpg'
                        bgcolor['default'] = 'rgb(201, 200, 200)'
                        break

                case 2:
                        image['default'] = '/assets/sample/MNT_1512293717450362.jpg'
                        bgcolor['default'] = 'rgb(166, 220, 230)'
                        break
        }

        settingFields.push(bgcolor)
        settingFields.push(image)

}

module.exports = common.Settings({
        mainTitle: '首页页面',
        settingKey: 'SLIDESHOWS',
        tabs: [
                {
                        'name': '封面图片',
                        'href': '/page/home' + init.settings.extname
                },
                {
                        'name': '广告图片',
                        'href': '/page/slideshows' + init.settings.extname,
                        'active': 'active'
                }
        ],
        settingFields: settingFields
})
