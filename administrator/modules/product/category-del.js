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
        schema.Category.findOne({
                where: {name: init.utils.REQUEST(req, 'name')}
        }).then(function (data) {
                data.destroy(function () {
                        init.renderJSON(res, {
                                code: '0',
                                message: '产品分类删除成功',
                                href: '/product/category.html?' + params.querystr
                        })
                })
        })
})
