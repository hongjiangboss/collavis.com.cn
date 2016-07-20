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

module.exports = common.SinglePage('MALL', function (params, req, res, next) {
        init.renderCache(res, 'homepage/singlepage', init.utils.update(params, {
                mainTitle: params.nav['n405'],
                innerHTML: buildInnerHTML(params)
        }))

        function buildInnerHTML (params) {
                params.page.left_img1 = params.page['left_img1'] || '/assets/img/btn_shop-jd.jpg'
                params.page.left_img2 = params.page['left_img2'] || '/assets/img/btn_shop-jd_on.jpg'
                params.page.right_img1 = params.page['right_img1'] || '/assets/img/btn_shop-t.jpg'
                params.page.right_img2 = params.page['right_img2'] || '/assets/img/btn_shop-t_on.jpg'

                return [
                        '<h2 class="page_tit">' + params.nav['n405'] + '</h2>',
                        '<div class="tablestyle1"></div>',
                        '<div class="online_box" style="width:980px;margin:4em auto">',
                                '<a target="_blank" href="' + (params.page['left_href'] || '') + '">',
                                        '<img src="' + params.page.left_img1 + '"',
                                                'onmouseout="this.src=\'' + params.page.left_img1 + '\'"',
                                                'onmouseover="this.src=\'' + params.page.left_img2 + '\'" />',
                                '</a>',
                                '<a target="_blank" href="' + (params.page['right_href'] || '') + '">',
                                        '<img src="' + params.page.right_img1 + '"',
                                                'onmouseout="this.src=\'' + params.page.right_img1 + '\'"',
                                                'onmouseover="this.src=\'' + params.page.right_img2 + '\'" />',
                                '</a>',
                        '</div>'
                ].join('')
        }
})
