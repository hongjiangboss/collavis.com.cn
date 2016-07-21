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

module.exports = common.Controller(function (params, req, res, next) {
        schema.Product.findOne({
                where: {num: req.params['id'], lang: params.htmlLang}
        }).then(function (data) {
                data = data || {}
                data.pictures = data['pictures'] || []

                schema.Settings.findOne({
                        where: {name: 'PRODUCT#' + params.htmlLang}
                }).then(function (settings) {
                        settings = settings || {}
                        var options = init.utils.JSONParse(settings['options'])
                        //return init.renderJSON(res, options)

                        schema.Category.findOne({
                                where: {name: data['category']}
                        }).then(function (category) {
                                category = category || {}
                                category_name = init.utils.JSONParse(category['options'])[params.htmlLang]

                                var pictures = init.utils.JSONParse(data.image)
                                for (let i = 0; i < pictures.length; i++) {
                                        if (pictures[i]) {
                                                if (!data.picfirst) {
                                                        data.picfirst = pictures[i]
                                                }

                                                data.pictures.push({
                                                        src: pictures[i],
                                                        cls: i === 0 ? 'on' : ''
                                                })
                                        }
                                }

                                init.renderCache(res, 'listpage/product-info', init.utils.update(params, {
                                        mainTitle: category_name,
                                        pinfo: {
                                                left_bgcolor: options['left_bgcolor'],
                                                left_image: options['left_image'],
                                                right_bgcolor: options['right_bgcolor'],
                                                right_image: options['right_image']
                                        },
                                        product: data
                                }))
                        })
                })
        })
})
