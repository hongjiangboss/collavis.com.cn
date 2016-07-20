// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之會社案內頁面
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')

const largeimg_demo = '/assets/sample/BEAUTY_1605108722777022.jpg'

module.exports = common.Controller(function (params, req, res, next) {
        res.render('homepage/map', init.utils.update(params, {
                mapKey: init.settings.mapKey,
                xandy: init.utils.REQUEST(req, 'xandy')
        }))
})
