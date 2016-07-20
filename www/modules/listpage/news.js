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
        schema.Article.all({
                where: {category: 'DONGTAIS'},
                order: 'datetime desc'
        }).then(function (datalist) {
                init.renderCache(res, 'listpage/listpage', init.utils.update(params, {
                        mainTitle: params.nav['n401'],
                        gridview: common.Gridview(datalist, {
                                href: params.cacheKey,
                                fnFormat: function (data) {
                                        return init.utils.update(data, {
                                                href: req.baseUrl + '/a/' + data.num + init.settings.extname
                                        })
                                }
                        }, req, params)
                }))
        })
})
