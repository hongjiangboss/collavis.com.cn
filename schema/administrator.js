// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定義管理員數據模式之列項結構
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const jugglingdb = require('jugglingdb')

module.exports = function (init) {
        return init.schema('administrator', {
                email:          { type: String,                     },
                username:       { type: String,         default: '' },
                password:       { type: String,         default: '' },
                realname:       { type: String,         default: '' },
                mobile:         { type: String,         default: '' },
                headimg:        { type: String,         default: '' },
                roleID:         { type: Number,         default: 0  },
                workID:         { type: Number,         default: 0  },
                partID:         { type: Number,         default: 0  },
                registerIP:     { type: String,         default: '' },
                signinIP:       { type: String,         default: '' },
                registerTime:   { type: Date,           default: Date.now() },
                signinTime:     { type: Date,           default: Date.now() },
                registerHost:   { type: String,         default: '' },
                signinHost:     { type: String,         default: '' },
                isEffect:       { type: Boolean,        default: true },
                clients:        { type: jugglingdb.Schema.Text }
        })
}
