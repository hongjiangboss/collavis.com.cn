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

module.exports = init.router([
        [ 'ALL',  '/home/homepage'              + init.settings.extname,        'modules/home/homepage'                 ],
        [ 'ALL',  '/administrator/password'     + init.settings.extname,        'modules/administrator/password'        ],

        [ 'GET',  '/page/seo'                   + init.settings.extname,        'modules/page/seo'                      ],
        [ 'GET',  '/page/zhaomu'                + init.settings.extname,        'modules/page/zhaomu'                   ],
        [ 'GET',  '/page/org'                   + init.settings.extname,        'modules/page/org'                      ],
        [ 'GET',  '/page/mall'                  + init.settings.extname,        'modules/page/mall'                     ],
        [ 'GET',  '/page/home'                  + init.settings.extname,        'modules/page/home'                     ],
        [ 'GET',  '/page/slideshows'            + init.settings.extname,        'modules/page/slideshows'               ],
        [ 'GET',  '/page/brand'                 + init.settings.extname,        'modules/page/brand'                    ],
        [ 'GET',  '/page/tv'                    + init.settings.extname,        'modules/page/tv'                       ],
        [ 'GET',  '/page/guide'                 + init.settings.extname,        'modules/page/guide'                    ],
        [ 'GET',  '/page/product'               + init.settings.extname,        'modules/page/product'                  ],

        [ 'ALL',  '/article/add'                + init.settings.extname,        'modules/article/article-add'           ],
        [ 'ALL',  '/article/adddo'              + init.settings.extname,        'modules/article/article-adddo'         ],
        [ 'GET',  '/article/article'            + init.settings.extname,        'modules/article/article'               ],
        [ 'ALL',  '/article/edit'               + init.settings.extname,        'modules/article/article-edit'          ],
        [ 'ALL',  '/article/editdo'             + init.settings.extname,        'modules/article/article-editdo'        ],
        [ 'ALL',  '/article/del'                + init.settings.extname,        'modules/article/article-del'           ],

        [ 'GET',  '/product/category'           + init.settings.extname,        'modules/product/category'              ],
        [ 'ALL',  '/product/category-add'       + init.settings.extname,        'modules/product/category-add'          ],
        [ 'ALL',  '/product/category-edit'      + init.settings.extname,        'modules/product/category-edit'         ],
        [ 'GET',  '/product/category-del'       + init.settings.extname,        'modules/product/category-del'          ],
        [ 'GET',  '/product/grant'              + init.settings.extname,        'modules/product/grant'                 ],
        [ 'ALL',  '/product/grant-add'          + init.settings.extname,        'modules/product/grant-add'             ],
        [ 'ALL',  '/product/grant-del'          + init.settings.extname,        'modules/product/grant-del'             ],
        [ 'ALL',  '/product/grant-edit'         + init.settings.extname,        'modules/product/grant-edit'            ],
        [ 'GET',  '/product/shop'               + init.settings.extname,        'modules/product/shop'                  ],
        [ 'ALL',  '/product/shop-add'           + init.settings.extname,        'modules/product/shop-add'              ],
        [ 'ALL',  '/product/shop-edit'          + init.settings.extname,        'modules/product/shop-edit'             ],
        [ 'ALL',  '/product/shop-del'           + init.settings.extname,        'modules/product/shop-del'              ],
        [ 'ALL',  '/product/product'            + init.settings.extname,        'modules/product/product'               ],
        [ 'ALL',  '/product/add'                + init.settings.extname,        'modules/product/product-add'           ],
        [ 'ALL',  '/product/adddo'              + init.settings.extname,        'modules/product/product-adddo'         ],
        [ 'ALL',  '/product/edit'               + init.settings.extname,        'modules/product/product-edit'          ],
        [ 'ALL',  '/product/editdo'             + init.settings.extname,        'modules/product/product-editdo'        ],
        [ 'ALL',  '/product/del'                + init.settings.extname,        'modules/product/product-del'           ]
        /*['ALL', '/article/add'],
        ['ALL', '/article/article'],
        ['ALL', '/article/page'],
        ['ALL', '/article/seo'],
        ['ALL', '/product/product'],
        ['ALL', '/product/category'],
        ['ALL', '/product/grant'],
        ['ALL', '/product/shop']*/
], filters.Authorize)
