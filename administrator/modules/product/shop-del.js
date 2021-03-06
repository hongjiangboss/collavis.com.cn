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
        schema.Shop.all().then(function (datalist) {
                for (let i = 0; i < datalist.length; i++) {
                        if (datalist[i].num === init.utils.REQUEST(req, 'id')) {
                                datalist[i].destroy()
                        }
                }

                init.renderJSON(res, {
                        code: '0',
                        message: '所选店铺以其翻译皆删除成功',
                        href: '/product/shop.html?' + params.querystr
                })
        })
})
