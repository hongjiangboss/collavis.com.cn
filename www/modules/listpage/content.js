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
        schema.Article.findOne({
                where: {num: req.params['id'], lang: params.htmlLang}
        }).then(function (data) {
                data = data || {}
                data.category_format = init.settings.articleCategories[data['category']]

                init.renderCache(res, 'listpage/content', init.utils.update(params, {
                        mainTitle: data.category_format,
                        article: data
                }))
        })
})
