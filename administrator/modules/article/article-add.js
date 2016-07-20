// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../../configure')
const common = require('../common')
const schema = require('../../../schema')(init)

module.exports = common.Controller(function (params, req, res, next) {
        res.render('article/article-add', init.utils.update(params, {
                mainTitle: '新建文章',
                subTitle: '简体中文版',
                image_upload: init.urlpath('/service/upload-editor'),
                articleCategories: init.settings.articleCategories
        }))
})
