// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之產品類型管理
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        schema.Product.all({
                where: {lang: init.utils.REQUEST(req, 'lang') || init.langDefault()}
        }).then(function (datalist) {
                schema.Category.all().then(function (category) {
                        res.render('product/product', init.utils.update(params, {
                                mutilLang: true,
                                mainTitle: '产品管理',
                                gridview: common.Gridview(datalist, {
                                        href: req.path + '?' + params.querystr,
                                        fnFormat: function (data) {
                                                data.category_format = ''
                                                for (let i = 0; i < category.length; i++) {
                                                        if (category[i].name === data.category) {
                                                                var options = init.utils.JSONParse(category[i].options)
                                                                data.category_format = options[params.codeLang]
                                                        }
                                                }
                                                return data
                                        }
                                }, req, params)
                        }))
                })
        })
})
