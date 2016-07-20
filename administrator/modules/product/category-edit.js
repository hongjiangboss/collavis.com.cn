// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之編輯產品類型
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        if (req.method === 'POST') {
                schema.Category.findOne({
                        where: {name: init.utils.REQUEST(req, 'id')}
                }).then(function (data) {
                        data = data || {}
                        if (!data['name']) {
                                return init.renderJSON(res, {
                                        code: '101',
                                        message: '提交的分类编号不存在'
                                })
                        }

                        data.updateAttributes({
                                options: init.utils.REQUEST(req, 'options'),
                                part: init.utils.REQUEST(req, 'part'),
                                orders: init.utils.REQUEST(req, 'orders'),
                                isEffect: init.utils.REQUEST(req, 'isEffect'),
                                timestamp: Date.now()
                        }, function () {
                                init.renderJSON(res, {
                                        code: '0',
                                        message: '编辑产品分类成功'
                                })
                        })
                })
                return
        }

        schema.Category.findOne({
                where: {name: init.utils.REQUEST(req, 'name')}
        }).then(function (data) {
                data = data || {}
                schema.Category.all().then(function (datalist) {
                        console.log(datalist)
                        var pardList = [{
                                name: '顶级分类',
                                selected: '',
                                value: ''
                        }]
                        datalist.forEach(function (subdata) {
                                if (!subdata.part && subdata.isEffect && subdata.name !== data.name) {
                                        pardList.push({
                                                name: init.utils.JSONParse(subdata.options)[init.langDefault()],
                                                selected: subdata.name == data.part ? 'selected' : '',
                                                value: subdata.name
                                        })
                                }
                        })

                        var options = init.utils.JSONParse(data.options)
                        for (let i = 0; i < params.listLang.length; i++) {
                                params.listLang[i]['value'] = options[params.listLang[i]['code']]
                        }
                        var titleLang = []
                        for (let i = params.listLang.length - 1; i >= 0; i--) {
                                titleLang.push(params.listLang[i])
                        }
                        res.render('product/category-edit', init.utils.update(params, {
                                mainTitle: '编辑产品分类',
                                pardList: pardList,
                                data: data,
                                titleLang: titleLang
                        }))
                })
        })

})
