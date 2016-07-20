// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之公共设置服务
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const fs = require('fs')
const path = require('path')
const init = require('../../configure')

module.exports = function (req, res, next) {
        var name = 'image'
        fs.readFile(req.files[name].path, function (err, data) {
                if (err) {
                        throw err
                }

                var hash = require('crypto').createHash('md5');
                var target_file = hash.update(data+'').digest('hex') + '.' + req.files[name].name.split('.')[1]
                var target_dist = path.join(path.dirname(init.APP_ROOT), '/public/upload', target_file)

                fs.writeFile(target_dist, data, function (err) {
                        if (err) {
                                throw err
                        }

                        fs.unlink(req.files[name].path)

                        init.renderJSON(res, {
                                code: '0',
                                href: '/public/upload/' + target_file
                        })
                })
        })
}
