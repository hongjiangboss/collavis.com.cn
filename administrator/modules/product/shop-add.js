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
                schema.Grant.findOne({
                        where: {xandy: init.utils.REQUEST(req, 'xandy')}
                }).then(function (data) {
                        data = data || {}

                        schema.Shop.create({
                                num:     createShopNum(),
                                name:    init.utils.REQUEST(req, 'name'),
                                address: init.utils.REQUEST(req, 'address'),
                                mobile:  init.utils.REQUEST(req, 'mobile'),
                                shenfen: init.utils.REQUEST(req, 'shenfen'),
                                city:    init.utils.REQUEST(req, 'city'),
                                xandy:   init.utils.REQUEST(req, 'xandy'),
                                lang:    init.utils.REQUEST(req, 'lang') || init.langDefault()
                        })

                        return init.renderJSON(res, {
                                code: '0',
                                message: '店铺信息添加成功',
                                href: '/product/shop.html?' + params.querystr
                        })
                })
                return
        }
        res.render('product/shop-add', init.utils.update(params, {
                mainTitle: '添加店铺信息',
                mapKey: init.settings.mapKey
        }))

        function createShopNum () {
                return Math.floor((Date.now() - 1467697504000) / 86400000) + '' + Math.floor(Math.random()*1000);
        }
})
