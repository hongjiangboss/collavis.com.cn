// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
//　主應用服務之首頁多語言跳轉
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')

module.exports = function (req, res, next) {
        var acceptLanguage = init.utils.acceptLanguage(req.headers)
        var currentLanguage = init.langDefault()

        if (init.settings.lang.enables.indexOf(acceptLanguage.long) !== -1) {
                currentLanguage = acceptLanguage.long
        } else if (init.settings.lang.enables.indexOf(acceptLanguage.short) !== -1) {
                currentLanguage = acceptLanguage.short
        }

        //res.redirect('/' + currentLanguage + '/home' + init.settings.extname)
        res.redirect('/' + init.settings.lang.enables[0] + '/home' + init.settings.extname)
}
