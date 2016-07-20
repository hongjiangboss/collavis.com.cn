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
        schema.Article.findOne({
                where: {num: init.utils.REQUEST(req, 'id'), lang: (init.utils.REQUEST(req, 'lang') || init.langDefault())}
        }).then(function (data) {
                data = data || {}
                for (let i = 0; i < params.listLang.length; i++) {
                        params.listLang[i].href = params.listLang[i].href + '&id=' + init.utils.REQUEST(req, 'id')
                }
                var articleCategories = init.settings.articleCategories
                for (let i = 0; i < articleCategories.length; i++) {
                        if (articleCategories[i].key === data['category']) {
                                articleCategories[i].checked = 'checked'
                        }
                }
                res.render('article/article-edit', init.utils.update(params, {
                        mainTitle: '编辑文章',
                        subTitle: params.nameLang,
                        mutilLang: true,
                        article: data,
                        articleEmpty: typeof data['num'] === 'undefined',
                        articleNum: init.utils.REQUEST(req, 'id'),
                        image_upload: init.urlpath('/service/upload-editor'),
                        articleCategories: init.settings.articleCategories
                }))
        })
})
