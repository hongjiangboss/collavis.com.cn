// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 主應用服務之主路由配置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')
const filters = require('../filters')

module.exports = init.router([
        [ 'ALL', '/home'        + init.settings.extname, 'modules/homepage/home'        ],
        [ 'ALL', '/zhaomu'      + init.settings.extname, 'modules/homepage/zhaomu'      ],
        [ 'ALL', '/mall'        + init.settings.extname, 'modules/homepage/mall'        ],
        [ 'ALL', '/org'         + init.settings.extname, 'modules/homepage/org'         ],
        [ 'ALL', '/brand'       + init.settings.extname, 'modules/homepage/brand'       ],
        [ 'ALL', '/search'      + init.settings.extname, 'modules/homepage/search'      ],
        [ 'ALL', '/store'       + init.settings.extname, 'modules/homepage/store'       ],
        [ 'ALL', '/news'        + init.settings.extname, 'modules/listpage/news'        ],
        [ 'ALL', '/school'      + init.settings.extname, 'modules/listpage/school'      ],
        [ 'ALL', '/guide'       + init.settings.extname, 'modules/listpage/guide'       ],
        [ 'ALL', '/story'       + init.settings.extname, 'modules/listpage/story'       ],
        [ 'ALL', '/tv'          + init.settings.extname, 'modules/listpage/tv'          ],
        [ 'ALL', '/a/:id'       + init.settings.extname, 'modules/listpage/content'     ],
        [ 'ALL', '/product/:id' + init.settings.extname, 'modules/listpage/product'     ],
        [ 'ALL', '/p/:id'       + init.settings.extname, 'modules/listpage/productinfo' ],
        [ 'ALL', '/map'         + init.settings.extname, 'modules/homepage/map'         ]
], filters.Cache)
