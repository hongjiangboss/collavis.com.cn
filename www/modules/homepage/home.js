// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之首頁頁面模塊
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.SinglePage('HOME', function (params, req, res, next) {
        schema.Settings.findOne({
                where: {name: 'SLIDESHOWS' + '#' + params.htmlLang}
        }).then(function (data) {
                data = data || {}
                var slideshows = []
                var buffers = init.utils.JSONParse(data['options'])

                for (let i = 0; i < init.settings.slideshows; i++) {
                        if (buffers[i + '_image']) {
                                slideshows.push({
                                        'src': buffers[i + '_image'],
                                        'href': buffers[i + '_href'],
                                        'rgb': buffers[i + '_bgcolor']
                                })
                        }
                }
                if (slideshows.length === 0) {
                        slideshows = [
                                {
                                        'src': '/assets/sample/MNT_1512293716959289.jpg',
                                        'rgb': 'rgb(255, 94, 131)'
                                },
                                {
                                        'src': '/assets/sample/MNT_1512293717305831.jpg',
                                        'rgb': 'rgb(201, 200, 200)'
                                },
                                {
                                        'src': '/assets/sample/MNT_1512293717450362.jpg',
                                        'rgb': 'rgb(166, 220, 230)'
                                }
                        ]
                }

                init.renderCache(res, 'homepage/home', init.utils.update(params, {
                        mainTitle: params['homeTitle'],
                        slideshows: slideshows
                }))
        })

})
