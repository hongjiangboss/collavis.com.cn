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
        schema.Product.all({
                where: {category: req.params['id'], lang:params.htmlLang},
                order: 'datetime desc'
        }).then(function (datalist) {
                schema.Settings.findOne({
                        where: {name: 'PRODUCT#' + params.htmlLang}
                }).then(function (data) {
                        data = data || {}
                        var settings = init.utils.JSONParse(data.options)
                        return init.renderJSON(settings)
                        schema.Category.all().then(function (categories) {
                                var category_name = ''
                                params.categoryList = []
                                for (let i = 0; i < categories.length; i++) {
                                        var options = init.utils.JSONParse(categories[i].options)

                                        if (categories[i].name === req.params['id']) {
                                                category_name = options[params.htmlLang]
                                        }

                                        if (categories[i].part === req.params['id']) {
                                                var buffers = {
                                                        key: categories[i].name,
                                                        name: options[params.htmlLang],
                                                        num: 0
                                                }

                                                for (let p = 0; p < datalist.length; p++) {
                                                        if (datalist[p].xilie === categories[i].name) {
                                                                buffers.num += 1
                                                        }
                                                }

                                                params.categoryList.push(buffers)
                                        }
                                }

                                init.renderCache(res, 'listpage/product', init.utils.update(params, {
                                        mainTitle: category_name,
                                        product: {
                                                title: settings['product_title']
                                        },
                                        gridview: common.Gridview(datalist, {
                                                href: params.cacheKey,
                                                fnFormat: function (data) {
                                                        return init.utils.update(data, {
                                                                href: req.baseUrl + '/p/' + data.num + init.settings.extname,
                                                                visited: params['listVisit'] + ':' + data['visited'],
                                                                picfirst: init.utils.JSONParse(data.image)[0]
                                                        })
                                                }
                                        }, req, params)
                                }))
                        })
                })
        })
})
