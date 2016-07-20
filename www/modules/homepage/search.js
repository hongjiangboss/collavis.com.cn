// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之首頁頁面模塊
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        schema.Grant.findOne({
                where: {wx: init.utils.REQUEST(req, 'wx')}
        }).then(function (data) {
                data = data || {}
                data.timeout = data['wx'] ? timeout(data) : ''
                res.render('homepage/search', init.utils.update(params, {
                        mainTitle: params.nav['n303'],
                        grantEmpty: data['wx'] || '1',
                        grant: data,
                        message: init.utils.REQUEST(req, 'wx') ? params.searchNotfound : ''
                }))
        })
})

function strtotime (str) {
        var params = str.split('-')
        var datetime = new Date()
        datetime.setFullYear(parseInt(params[0]))
        datetime.setMonth(parseInt(params[1]) - 1)
        datetime.setDate(params[2])
        return datetime.getTime()
}

function timeout (data) {
        return Math.ceil((strtotime(data.finish) - Date.now())/86400000)
}
