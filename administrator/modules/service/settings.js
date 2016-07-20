// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之公共设置服务
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const schema = require('../../../schema')(init)

module.exports = function (req, res, next) {
        var settingID = init.utils.REQUEST(req, 'setting-key') + '#' + init.utils.REQUEST(req, 'setting-lang')
        schema.Settings.findOne({
                where: {name: settingID}
        }).then(function (data) {
                data = data || {}
                if (data['name']) {
                        data.updateAttributes({
                                timestamp: Date.now(),
                                options: init.utils.REQUEST(req, 'setting-options')
                        })
                } else {
                        schema.Settings.create({
                                name: settingID,
                                timeout: Date.now(),
                                options: init.utils.REQUEST(req, 'setting-options')
                        })
                }

                init.renderJSON(res, {
                        code: 0,
                        message: init.utils.REQUEST(req, 'setting-title') + '设置成功'
                })
        })
}
