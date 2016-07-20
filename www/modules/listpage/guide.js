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
                where: {category: 'MEISHENG'},
                order: 'datetime desc'
        }).then(function (datalist) {
                schema.Settings.findOne({
                        where: {name: 'GUIDE#' + params.htmlLang}
                }).then(function (data) {
                        data = data || {}
                        var options = init.utils.JSONParse(data.options)

                        var gridview = common.Gridview(datalist, {
                                href: params.cacheKey,
                                fnFormat: function (data) {
                                        return init.utils.update(data, {
                                                href: req.baseUrl + '/a/' + data.num + init.settings.extname,
                                                listVisit: params.listVisit,
                                                datetime: data.datetime.split(' ')[0]
                                        })
                                }
                        }, req, params)

                        if (init.utils.REQUEST(req, 'page')) {
                                return init.renderJSON(res, gridview.datalist)
                        }

                        init.renderCache(res, 'listpage/guide', init.utils.update(params, {
                                mainTitle: params.nav['n201'],
                                gridview: gridview,
                                guide: {
                                        title: options['guide_title']
                                }
                        }))
                })
        })
})
