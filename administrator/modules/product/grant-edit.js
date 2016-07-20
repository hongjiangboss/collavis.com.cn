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
                        where: {wx: init.utils.REQUEST(req, 'wx')}
                }).then(function (data) {
                        data = data || {}

                        if (!data['wx']) {
                                return init.renderJSON(res, {
                                        code: '0',
                                        message: '微信号不存在',
                                        href: '/product/grant.html?' + params.querystr
                                })
                        }

                        data.updateAttributes({
                                wx: init.utils.REQUEST(req, 'wx'),
                                name: init.utils.REQUEST(req, 'name'),
                                level: init.utils.REQUEST(req, 'level'),
                                begins: init.utils.REQUEST(req, 'begins'),
                                finish: init.utils.REQUEST(req, 'finish'),
                                isEffect: true
                        })

                        return init.renderJSON(res, {
                                code: '0',
                                message: '授权代理编辑成功',
                                href: '/product/grant.html?' + params.querystr
                        })
                })
                return
        }

        schema.Grant.findOne({
                where: {wx: init.utils.REQUEST(req, 'id')}
        }).then(function (data) {
                res.render('product/grant-edit', init.utils.update(params, {
                        mainTitle: '编辑代理授权',
                        grant: data
                }))
        })
})
