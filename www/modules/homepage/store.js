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
        var keyword = init.utils.REQUEST(req, 'keyword')

        schema.Shop.all().then(function (datalist) {
                res.render('homepage/store', init.utils.update(params, {
                        mainTitle: params.nav['n404'],
                        mapKey: init.settings.mapKey,
                        gridview: common.Gridview(datalist, {
                                href: params.cacheKey + (keyword ? '?keyword='+keyword : ''),
                                fnFormat: function (data) {
                                        if (!params['initmap'] && data.xandy) {
                                                params.initMap = data.xandy
                                        }

                                        return init.utils.update(data, {
                                                btn: params['storeInfo']
                                        })
                                },
                                filter: function (data) {
                                        if (keyword) {
                                                data.shenfen = data['shenfen'] || ''
                                                data.city = data['city'] || ''
                                                data.address = data['address'] || ''
                                                
                                                var v1 = data.shenfen.indexOf(keyword) === -1
                                                var v2 = data.city.indexOf(keyword) === -1
                                                var v3 = data.address.indexOf(keyword) === -1

                                                if (v1 && v2 && v3) {
                                                        return false
                                                }
                                        }

                                        return true
                                }
                        }, req, params)
                }))
        })
})
