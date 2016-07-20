// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之品牌頁面
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

const largeimg_demo = '/assets/sample/BEAUTY_1605108722777022.jpg'

module.exports = common.SinglePage('BRAND', function (params, req, res, next) {
        if (!params.page['first_top'] && !params.page['second_left'] && !params.page['third_left'] && !params.page['fourth_left']) {
                params.page = init.utils.update(params.page, {
                        first_view: true,
                        second_view: true,
                        third_view: true,
                        fourth_view: true
                })
        }
        if (params.page['first_top']) {
                params.page.first_view = true
        }
        if (params.page['second_left']) {
                params.page.second_view = true
        }
        if (params.page['third_left']) {
                params.page.third_view = true
        }
        if (params.page['fourth_left']) {
                params.page.fourth_view = true
        }

        init.renderCache(res, 'homepage/brand', init.utils.update(params, {
                mainTitle: params.nav['n402'],
                brand_view: true
        }))
})
