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
        schema.Product.create({
                num: createArticleNum(),
                title: init.utils.REQUEST(req, 'title'),
                lang: init.langDefault(),
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
        }, function () {
                init.renderJSON(res, {
                        code: '0',
                        message: ''
                })
        })

        function createArticleNum () {
                return Math.floor((Date.now() - 1467697504000) / 86400000) + '' + Math.floor(Math.random()*1000);
        }
})
