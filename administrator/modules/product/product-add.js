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
        schema.Category.all().then(function (datalist) {
                params = init.utils.update(params, buildCategory(datalist))
                params.picture = buildPicture()
                
                res.render('product/product-add', init.utils.update(params, {
                        mainTitle: '添加产品',
                        subTitle: '简体中文版',
                        image_upload: init.urlpath('/service/upload-editor'),
                        articleCategories: init.settings.articleCategories
                }))
        })
})

function buildCategory (datalist, data) {
        var categoryBuffers = []
        var xilieBuffers = []

        for (let i = 0; i < datalist.length; i++) {
                var name = init.utils.JSONParse(datalist[i].options)[init.langDefault()]
                categoryBuffers.push({
                        name: name,
                        value: datalist[i].name,
                        selected: data && data.category === datalist[i].name ? 'selected' : ''
                })

                for (let j = 0; j < datalist.length; j++) {
                        if (datalist[j]['part'] === datalist[i].name) {
                                var subname = init.utils.JSONParse(datalist[j].options)[init.langDefault()]
                                xilieBuffers.push({
                                        name: name + ' - ' + subname,
                                        value: datalist[j].name,
                                        selected: data && data.xilie === datalist[j].name ? 'selected' : ''
                                })
                        }
                }
        }

        return {
                category: categoryBuffers,
                xilie: xilieBuffers
        }
}

function buildPicture (data) {
        var pictures = init.utils.JSONParse((data || {})['image'])

        var buffers = []
        for (let i = 1; i <= init.settings.productPicture; i++) {
                buffers.push({
                        key: i,
                        name: '展示图' + i,
                        value: i <= pictures.length ? pictures[i - 1] : ''
                })
        }
        return buffers
}
