// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 主應用服務首頁保護之路由配置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')

module.exports = init.router([
        [ 'ALL', '/',                                    'modules/index' ],
        [ 'ALL', '/index' + init.settings.pathExt,       'modules/index' ],
        [ 'ALL', '/index.html',                          'modules/index' ],
        [ 'ALL', '/index.htm',                           'modules/index' ],
        [ 'ALL', '/index.php',                           'modules/index' ],
        [ 'ALL', '/index.jsp',                           'modules/index' ],
        [ 'ALL', '/index.asp',                           'modules/index' ],
        [ 'ALL', '/index.aspx',                          'modules/index' ],
        [ 'ALL', '/default' + init.settings.pathExt,     'modules/index' ],
        [ 'ALL', '/default.html',                        'modules/index' ],
        [ 'ALL', '/default.htm',                         'modules/index' ],
        [ 'ALL', '/default.apsx',                        'modules/index' ]
])
