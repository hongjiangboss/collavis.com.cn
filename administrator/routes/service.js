// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之主路由配置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')
const filters = require('../filters')
const multipart = require('connect-multiparty')

module.exports = init.router([
        [ 'POST', '/settings'           + init.settings.extname,        'modules/service/settings',      filters.Authorize      ],
        [ 'ALL',  '/upload'             + init.settings.extname,        'modules/service/upload',        multipart()            ],
        [ 'ALL',  '/upload-editor'      + init.settings.extname,        'modules/service/upload-editor', multipart()            ],
])
