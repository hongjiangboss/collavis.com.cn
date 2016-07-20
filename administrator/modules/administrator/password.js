// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之修改密碼頁面
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        if (req.method === 'POST') {
                var params = {
                        code: '0',
                        message: '账号设置成功'
                }

                schema.Administrator.findOne({
                        where: {email: init.utils.SESSION(req, 'uid')}
                }).then(function (data) {
                        var edits = {
                                username: init.utils.REQUEST(req, 'username'),
                                realname: init.utils.REQUEST(req, 'realname'),
                                mobile: init.utils.REQUEST(req, 'mobile')
                        }

                        if (init.utils.REQUEST(req, 'password-old') && init.utils.REQUEST(req, 'password-new')) {
                                var password_old = init.utils.HashSha512(init.utils.REQUEST(req, 'password-old'))

                                if (password_old !== data.password) {
                                        return init.renderJSON(res, init.utils.update(params, {
                                                code: 101,
                                                message: '旧密码输出错误'
                                        }))
                                }

                                edits.password = init.utils.HashSha512(init.utils.REQUEST(req, 'password-new'))
                        }

                        data.updateAttributes(edits, function () {
                                init.renderJSON(res, params)
                        })
                })

                return
        }
        
        schema.Administrator.findOne({
                where: {email: init.utils.SESSION(req, 'uid')}
        }).then(function (data) {
                res.render('administrator/password', init.utils.update(params, {
                        mainTitle: '账号设置',
                        data: data
                }))
        })
})
