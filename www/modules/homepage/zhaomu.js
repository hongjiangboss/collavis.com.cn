// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之招募政策頁面
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

const largeimg_demo = '/assets/sample/BEAUTY_1603292191562798.jpg'

module.exports = common.SinglePage('ZHAOMU', function (params, req, res, next) {
        init.renderCache(res, 'homepage/singlepage', init.utils.update(params, {
                mainTitle: params.nav['n301'],
                brand_view: false,
                innerHTML: [
                        '<div class="view_img">',
                        '<img src="' + (params.page['largeimg'] ? params.page['largeimg'] : largeimg_demo) + '" />',
                        '</div>'
                ].join('')
        }))
})
