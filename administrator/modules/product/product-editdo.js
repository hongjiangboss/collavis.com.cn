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
        schema.Product.findOne({
                where: {num: init.utils.REQUEST(req, 'num'), lang: init.utils.REQUEST(req, 'lang')}
        }).then(function (data) {
                data = data || {}
                if (data['num']) {
                        data.updateAttributes({
                                title: init.utils.REQUEST(req, 'title'),
                                description: init.utils.REQUEST(req, 'description'),
                                category: init.utils.REQUEST(req, 'category'),
                                datetime: init.utils.REQUEST(req, 'datetime'),
                                visited: init.utils.REQUEST(req, 'visited'),
                                content: init.utils.REQUEST(req, 'content'),
                                image: init.utils.REQUEST(req, 'image'),
                                size: init.utils.REQUEST(req, 'size'),
                                price: init.utils.REQUEST(req, 'price'),
                                shop: init.utils.REQUEST(req, 'shop'),
                                xilie: init.utils.REQUEST(req, 'xilie')
                        })
                } else {
                        schema.Product.create({
                                num: init.utils.REQUEST(req, 'num'),
                                title: init.utils.REQUEST(req, 'title'),
                                lang: init.utils.REQUEST(req, 'lang'),
                                description: init.utils.REQUEST(req, 'description'),
                                category: init.utils.REQUEST(req, 'category'),
                                datetime: init.utils.REQUEST(req, 'datetime'),
                                visited: init.utils.REQUEST(req, 'visited'),
                                content: init.utils.REQUEST(req, 'content'),
                                image: init.utils.REQUEST(req, 'image'),
                                size: init.utils.REQUEST(req, 'size'),
                                price: init.utils.REQUEST(req, 'price'),
                                shop: init.utils.REQUEST(req, 'shop'),
                                xilie: init.utils.REQUEST(req, 'xilie')
                        })
                }

                init.renderJSON(res, {
                        code: '0',
                        message: '编辑文章成功'
                })
        })
})
