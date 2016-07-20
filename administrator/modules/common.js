// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之公共頁面模塊
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')
const querystring = require('querystring')
const schema = require('../../schema')(init)

function Controller (fn) {
        return function (req, res, next) {
                var params = {
                        client: init.utils.SESSION(req, 'client'),
                        htmlLang: init.utils.SESSION(req, 'lang'),
                        codeLang: init.utils.GET(req, 'lang') || init.langDefault(),
                        listLang: [],
                        mainTitle: '',
                        urlquery: {
                                uid: init.utils.REQUEST(req, 'uid')
                        },
                        settingFields: []
                }

                params.nameLang = init.settings.lang.keyword[params.codeLang]
                params.urlquery[init.settings.tokenKey] = init.utils.REQUEST(req, init.settings.tokenKey)
                params.querystr = querystring.stringify(params.urlquery)
                params.urlself = req.path + '?' + params.querystr
                init.settings.lang.locales.forEach(function (lang) {
                        params.listLang.push({
                                code: lang,
                                name: init.settings.lang.keyword[lang],
                                href: req.path + '?' + params.querystr + '&lang=' + lang
                        })
                })

                fn(params, req, res, next)
        }
}

function Settings (configure) {
        return Controller(function (params, req, res, next) {
                schema.Settings.findOne({
                        where: {name: configure['settingKey'] + '#' + params.codeLang}
                }).then(function (data) {
                        data = data || {}
                        var options = init.utils.JSONParse(data['options'] || '')
                        var settingFields = configure['settingFields'] || []

                        for (let i = 0; i < settingFields.length; i++) {
                                var field = settingFields[i].key

                                settingFields[i]['value'] = options[field]
                                if (!settingFields[i]['default']) {
                                        settingFields[i]['default'] = init.locale(params.codeLang, field)
                                }
                        }

                        if (configure['tabs']) {
                                params.isTabs = true

                                for (let i = 0; i < configure['tabs'].length; i++) {
                                        configure['tabs'][i].href = configure['tabs'][i]['href'] + '?' + params.querystr
                                }

                                params.tabs = configure['tabs']
                        }

                        res.render('service/settings', init.utils.update(params, {
                                mutilLang: true,
                                mainTitle: configure['mainTitle'],
                                subTitle: params.nameLang,
                                settingKey: configure['settingKey'],
                                settingLang: params.codeLang,
                                settingFields: settingFields
                        }))
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

        return gridview
}

module.exports.Controller = Controller
module.exports.Settings = Settings
module.exports.Gridview = Gridview
