// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        if (req.method === 'POST') {
                schema.Shop.findOne({
                        where: {num: init.utils.REQUEST(req, 'num'), lang: init.utils.REQUEST(req, 'lang')}
                }).then(function (data) {
                        data = data || {}

                        if (data['num']) {
                                data.updateAttributes({
                                        name:    init.utils.REQUEST(req, 'name'),
                                        address: init.utils.REQUEST(req, 'address'),
                                        mobile:  init.utils.REQUEST(req, 'mobile'),
                                        shenfen: init.utils.REQUEST(req, 'shenfen'),
                                        city:    init.utils.REQUEST(req, 'city'),
                                        xandy:   init.utils.REQUEST(req, 'xandy')
                                })
                        } else {
                                schema.Shop.create({
                                        num:     init.utils.REQUEST(req, 'num'),
                                        name:    init.utils.REQUEST(req, 'name'),
                                        address: init.utils.REQUEST(req, 'address'),
                                        mobile:  init.utils.REQUEST(req, 'mobile'),
                                        shenfen: init.utils.REQUEST(req, 'shenfen'),
                                        city:    init.utils.REQUEST(req, 'city'),
                                        xandy:   init.utils.REQUEST(req, 'xandy'),
                                        lang:    init.utils.REQUEST(req, 'lang') || init.langDefault()
                                })
                        }

                        init.renderJSON(res, {
                                code: '0',
                                message: '编辑店铺成功',
                                href: '/product/shop.html?' + params.querystr
                        })
                })
                return
        }
        schema.Shop.findOne({
                where: {num: init.utils.REQUEST(req, 'id'), lang: (init.utils.REQUEST(req, 'lang') || init.langDefault())}
        }).then(function (data) {
                //data = data || {}
                console.log(data)
                console.log({num: init.utils.REQUEST(req, 'id'), lang: (init.utils.REQUEST(req, 'lang') || init.langDefault())})
                for (let i = 0; i < params.listLang.length; i++) {
                        params.listLang[i].href = params.listLang[i].href + '&id=' + init.utils.REQUEST(req, 'id')
                }

                res.render('product/shop-edit', init.utils.update(params, {
                        mainTitle: '编辑店铺',
                        subTitle: params.nameLang,
                        mapKey: init.settings.mapKey,
                        mutilLang: true,
                        shopID: init.utils.REQUEST(req, 'id'),
                        data: data
                }))
        })

        function createShopNum () {
                return Math.floor((Date.now() - 1467697504000) / 86400000) + '' + Math.floor(Math.random()*1000);
        }
})
