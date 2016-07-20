// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之公共頁面模塊
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')
const schema = require('../../schema')(init)

function Controller (fn) {
        return function (req, res, next) {
                var htmlLang = req.baseUrl.replace('/', '')

                var params = init.locale(htmlLang)
                params.htmlLang = htmlLang
                params.extname = init.settings.extname
                params.cacheKey = req.baseUrl + req.path
                params.langLocales = []
                init.settings.lang.locales.forEach(function (code) {
                        var href = ''
                        if (init.settings.lang.enables.indexOf(code) !== -1) {
                                href = '/' + code + '/home' + init.settings.extname
                        }
                        params.langLocales.push({
                                code: code,
                                name: init.settings.lang.keyword[code],
                                htmlLang: htmlLang,
                                extname: params.extname,
                                href: href
                        })
                })


                schema.Settings.findOne({
                        where: {name: 'SEO#' + htmlLang}
                }).then(function (data) {
                        data = data || {}

                        var options = init.utils.JSONParse(data['options'])
                        for (let field in options) {
                                if (options[field]) {
                                        params[field] = options[field]
                                }
                        }

                        schema.Category.all().then(function (datalist) {
                                datalist = datalist || []

                                var categories = []
                                datalist.forEach(function (buffer) {
                                        if (!buffer['part'] && buffer.isEffect) {
                                                var options = init.utils.JSONParse(buffer.options)
                                                categories.push({
                                                        name: buffer['name'],
                                                        text: options[params.htmlLang],
                                                        htmlLang: params.htmlLang,
                                                        extname: params.extname
                                                })
                                        }
                                })
                                params.categories = categories

                                fn(params, req, res, next)

                        })
                })
        }
}

function SinglePageController (name, fn) {
        return Controller(function (params, req, res, next) {
                schema.Settings.findOne({
                        where: {name: name + '#' + params.htmlLang}
                }).then(function (data) {
                        data = data || {}

                        params.page = init.utils.JSONParse(data['options'])
                        fn(params, req, res, next)
                })
        })
}

function Gridview (datalist, configure, req, params) {
        var gridview = {datalist: [], pagebars: []}
        var gridviewParams = {
                num: init.utils.REQUEST(req, 'page') ? parseInt(init.utils.REQUEST(req, 'page')) : 1,
                limit: init.settings.pageLimit || 10,
                count: 0,
                pages: 0
        }

        datalist.forEach(function (data) {
                if (typeof configure['filter'] === 'function') {
                        if (!configure['filter'](data)) {
                                return false
                        }
                }

                var begin = (gridviewParams.num - 1) * gridviewParams.limit
                if (begin <= gridviewParams.count && gridviewParams.count < begin + gridviewParams.limit) {
                        var buffers = data

                        if (typeof configure['fnFormat'] === 'function') {
                                buffers = configure['fnFormat'](data)
                        }

                        if (params) {
                                buffers.__querystr = params['querystr'] || ''
                        }

                        gridview.datalist.push(buffers)
                }

                gridviewParams.count = gridviewParams.count + 1
        })
        gridviewParams.pages = Math.ceil(gridviewParams.count / gridviewParams.limit)
        var sign = (configure['href'] || '').indexOf('?') !== -1 ? '&' : '?'
        for (let i = 1; i <= gridviewParams.pages; i++) {
                gridview.pagebars.push({
                        num: i,
                        href: configure['href'] + sign + 'page=' + i,
                        active: i === gridviewParams.num
                })
        }

        return init.utils.update(gridview, gridviewParams)
}

module.exports.Controller = Controller
module.exports.SinglePage = SinglePageController
module.exports.Gridview = Gridview
