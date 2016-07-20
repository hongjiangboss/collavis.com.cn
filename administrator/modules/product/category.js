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

function format_options (options) {
        var buffers = ['<table width="100%"><tr>']

        var attrs = init.utils.JSONParse(options)
        for (let i = init.settings.lang.locales.length - 1; i >= 0; i--) {
                var field = init.settings.lang.locales[i]
                buffers.push('<td width="20%">')
                buffers.push('<small>' + init.settings.lang.keyword[field] + '：</small>' + attrs[field])
                buffers.push('</td>')
        }

        buffers.push('</tr></table>')
        return buffers.join(' ')
}

module.exports = common.Controller(function (params, req, res, next) {
        schema.Category.all().then(function (datalist) {
                var gridview = []
                datalist.forEach(function (first) {
                        if (first.isEffect && !first.part) {
                                first.text = format_options(first.options)
                                first.href = params.querystr + '&name=' + first.name
                                gridview.push(first)

                                datalist.forEach(function (second) {
                                        if (second.part == first.name) {
                                                second.text = format_options(second.options)
                                                second.href = params.querystr + '&name=' + second.name
                                                second.name = '&nbsp;&nbsp;&nbsp;&nbsp;' + second.name
                                                gridview.push(second)
                                        }
                                })
                        }
                })
                res.render('product/category', init.utils.update(params, {
                        mainTitle: '产品分类',
                        gridview: gridview
                }))
        })
})
