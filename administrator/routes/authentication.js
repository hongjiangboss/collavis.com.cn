// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 身份認證服務之路由配置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')

module.exports = init.router([
        [ 'ALL', '/check'  + init.settings.extname,     'modules/authentication/check'  ],
        [ 'ALL', '/signin' + init.settings.extname,     'modules/authentication/signin' ],
])
