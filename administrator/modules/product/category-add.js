// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之添加產品類型
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
                        if (data['name']) {
                                return init.renderJSON(res, {
                                        code: '101',
                                        message: '提交的分类编号已经存在'
                                })
                        }

                        schema.Category.create({
                                name: init.utils.REQUEST(req, 'id'),
                                options: init.utils.REQUEST(req, 'options'),
                                part: init.utils.REQUEST(req, 'part'),
                                orders: init.utils.REQUEST(req, 'orders'),
                                isEffect: init.utils.REQUEST(req, 'isEffect')
                        }, function () {
                                init.renderJSON(res, {
                                        code: '0',
                                        message: '添加产品分类成功'
                                })
                        })
                })
                return
        }

        schema.Category.all().then(function (datalist) {
                var pardList = [{
                        name: '顶级分类',
                        selected: 'selected',
                        value: ''
                }]
                datalist.forEach(function (data) {
                        if (!data.part && data.isEffect) {
                                pardList.push({
                                        name: init.utils.JSONParse(data.options)[init.langDefault()],
                                        selected: '',
                                        value: data.name
                                })
                        }
                })
                var titleLang = []
                for (let i = params.listLang.length - 1; i >= 0; i--) {
                        titleLang.push(params.listLang[i])
                }
                res.render('product/category-add', init.utils.update(params, {
                        mainTitle: '添加产品分类',
                        pardList: pardList,
                        titleLang: titleLang
                }))
        })
})
