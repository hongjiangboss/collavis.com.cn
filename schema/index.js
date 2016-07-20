// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 自定義數據儲存之模式列項
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const administrator = require('./administrator')
const settings = require('./settings')
const category = require('./category')
const article = require('./article')
const grant = require('./grant')
const shop = require('./shop')
const product = require('./product')

module.exports = function (init) {
        return {
                Administrator: administrator(init),
                Settings: settings(init),
                Category: category(init),
                Article: article(init),
                Grant: grant(init),
                Shop: shop(init),
                Product: product(init)
        }
}
