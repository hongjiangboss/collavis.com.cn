// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之產品類型管理
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        switch (init.utils.REQUEST(req, 'type')) {
                case 'w':
                        params.subTitle = '一周内即将到期的代理商户'
                        break

                case 'e':
                        params.subTitle = '刚到期的代理商户需要手工确认'
                        break
        }
        schema.Grant.all().then(function (datalist) {
                res.render('product/grant', init.utils.update(params, {
                        mainTitle: '代理授权',
                        isTabs: true,
                        tabs: [
                                {
                                        name: '所有代理',
                                        href: '/product/grant' + init.settings.extname + '?' + params.querystr + '&type=a',
                                        active: ['w', 'e'].indexOf(init.utils.REQUEST(req, 'type')) === -1 ? 'active' : ''
                                },
                                {
                                        name: '即将到期',
                                        href: '/product/grant' + init.settings.extname + '?' + params.querystr + '&type=w',
                                        active: init.utils.REQUEST(req, 'type') === 'w' ? 'active' : ''
                                },
                                {
                                        name: '已经到期',
                                        href: '/product/grant' + init.settings.extname + '?' + params.querystr + '&type=e',
                                        active: init.utils.REQUEST(req, 'type') === 'e' ? 'active' : ''
                                }
                        ],
                        gridview: common.Gridview(datalist, {
                                href: req.path + '?' + params.querystr + '&type=' + (init.utils.REQUEST(req, 'type') || 'a'),
                                filter: function (data) {
                                        var t = timeout(data)

                                        switch (init.utils.REQUEST(req, 'type')) {
                                                case 'w':
                                                        if (data.isEffect && t > 0 && t <= 7) {
                                                                return true
                                                        }
                                                        break

                                                case 'e':
                                                        if (!data.isEffect || t <= 0) {
                                                                return true
                                                        }
                                                        break

                                                default:
                                                        var search = init.utils.REQUEST(req, 'search')

                                                        if (!search && data.isEffect && t > 0) {
                                                                return true
                                                        }

                                                        if (search && data.wx.indexOf(search) !== -1) {
                                                                return true
                                                        }
                                        }

                                        return false
                                },
                                fnFormat: function (data) {
                                        data.timeout = timeout(data)
                                        data.type = init.utils.REQUEST(req, 'type')
                                        return data
                                }
                        }, req, params)
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
