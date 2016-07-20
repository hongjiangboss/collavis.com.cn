// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定義設置項數據模式之列項結構
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const jugglingdb = require('jugglingdb')

module.exports = function (init) {
        return init.schema('product', {
                num:            { type: String, default: '' },
                title:          { type: String, default: '' },
                lang:           { type: String, default: '' },
                description:    { type: String, default: '' },
                category:       { type: String, default: '' },
                xilie:          { type: String, default: '' },
                datetime:       { type: String, default: '' },
                visited:        { type: String, default: '' },
                image:          { type: String, default: '' },
                size:           { type: String, default: '' },
                price:          { type: String, default: '' },
                shop:           { type: String, default: '' },
                content:        { type: jugglingdb.Schema.Text },
        })
}
