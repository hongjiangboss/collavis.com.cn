// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之身份過濾中間件
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')
const locale = init.locale()

module.exports = function (req, res, next) {
        req = init.utils.init_session(req)
        if (!init.utils.SESSION(req, 'uid')) {
                res.set('Content-Type', 'text/html;charset=UTF-8')
                res.end('<script type="text/javascript">alert("' + locale.error.timeout + '")</script>')
                return
        }
        next()
}
