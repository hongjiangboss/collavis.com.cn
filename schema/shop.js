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
        return init.schema('shop', {
                num:            { type: String },
                name:           { type: String, default: '' },
                address:        { type: String, default: '' },
                shenfen:        { type: String, default: '' },
                city:           { type: String, default: '' },
                mobile:         { type: String, default: '' },
                xandy:          { type: String, default: '' },
                lang:           { type: String, default: '' },
                isEffect:       { type: Boolean, default: true}
        })
}
