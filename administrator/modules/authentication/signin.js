// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 登錄賬號並且更新用戶信息
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const schema = require('../../../schema')(init)
const permissions = require('../permissions')

const locale = init.locale()

module.exports = function (req, res, next) {
        var params = {
                code: '0',
                message: '',
                data: {
                        token: '',
                        index: init.urlpath('/home/homepage'),
                        homepage: init.urlpath('/home/homepage'),
                        settings: init.urlpath('/administrator/password'),
                        username: 'administrator',
                        email: init.utils.REQUEST(req, 'username'),
                        headimg: './assets/img/social-github.svg',
                        menuActive: true,
                        menu: []
                }
        }

        schema.Administrator.findOne({
                where: {email: init.utils.REQUEST(req, 'username')}
        }).then(function (data) {
                if (!data || data.isEffect === false) {
                        return init.renderJSON(res, init.utils.update(params, {
                                code: '102',
                                message: locale.error.notExists
                        }))
                }

                var password = init.utils.REQUEST(req, 'password')
                if (data.password !== init.utils.HashSha512(password)) {
                        return init.renderJSON(res, init.utils.update(params, {
                                code: 103,
                                message: locale.error.password
                        }))
                }

                var clientValid = false
                var clientSaved = init.utils.JSONParse(data.clientID)
                for (let hostname in clientSaved) {
                        if (hostname === init.utils.REQUEST(req, 'clientID')) {
                                var clientInfo = clientSaved[init.utils.REQUEST(req, 'clientID')]

                                if (clientInfo.platform !== init.utils.REQUEST(req, 'platform')) {
                                        continue
                                }

                                for (let i = 0; i < clientInfo.macIDs.length; i++) {
                                        if (init.utils.REQUEST(req, 'macIDs').indexOf(clientInfo.macIDs[i]) !== -1) {
                                                clientValid = true
                                                break
                                        }
                                }
                        }
                }
                if (!clientValid && init.settings['clientNum'] && init.utils.len(clientSaved) > init.settings['clientNum']) {
                        return init.renderJSON(res, init.utils.update(params, {
                                code: 104,
                                message: locale.error.noPermissions
                        }))
                }

                clientSaved[init.utils.REQUEST(req, 'clientID')] = {
                        platform: init.utils.REQUEST(req, 'platform'),
                        macIDs: init.utils.REQUEST(req, 'macIDs').split(',')
                }
                data.updateAttributes({
                        signinIP: req.ip,
                        signinTime: Date.now(),
                        signinHost: init.utils.REQUEST(req, 'clientID'),
                        clients: init.utils.JSONStringify(clientSaved)
                }, function () {
                        req = init.utils.SESSION(req, {
                                uid: init.utils.REQUEST(req, 'username'),
                                lang: init.utils.REQUEST(req, 'lang'),
                                client: {
                                        root: init.utils.REQUEST(req, 'dirname'),
                                        theme: init.utils.REQUEST(req, 'theme'),
                                        platform: init.utils.REQUEST(req, 'platform')
                                }
                        })

                        permissions(data, function (menu) {
                                if (data.username) {
                                        params.data.username = data.username
                                }
                                if (data.headimg) {
                                        params.data.headimg = data.headimg
                                }
                                params.data.menu = menu
                                params.data.token = req.sessionID

                                init.renderJSON(res, params)
                        })
                })

        })
}
