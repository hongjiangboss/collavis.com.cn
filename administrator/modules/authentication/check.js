// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 檢測登錄賬號的用戶是否存在
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const schema = require('../../../schema')(init)

const locale = init.locale()

module.exports = function (req, res, next) {
        var params = {
                code: '0',
                message: '',
                data: {
                        token: '',
                        username: 'administrator',
                        email: init.utils.REQUEST(req, 'username'),
                        headimg: './assets/img/social-github.svg'
                }
        }

        if (init.utils.REQUEST(req, 'key') !== init.settings.apiKey) {
                return init.renderJSON(res, init.utils.update(params, {
                        code: '101',
                        message: locale.error.apiKey
                }))
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

                if (data.username) {
                        params.data.username = data.username
                }
                if (data.headimg) {
                        params.data.headimg = data.headimg
                }
                params.data.token = req.sessionID

                init.renderJSON(res, params)
        })
}
