// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 主應用服務之緩存過濾
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../configure')

module.exports = function (req, res, next) {
        var currentLanguage = req.baseUrl.replace('/', '')

        if (init.settings.lang.locales.indexOf(currentLanguage) === -1) {
                return res.redirect('/' + init.langDefault() + '/home' + init.settings.extname)
        }

        if (init.settings.lang.enables.indexOf(currentLanguage) === -1) {
                var params = init.locale()
                var versionLang = init.settings.lang.keyword[currentLanguage]
                var titleHeaders = [
                        'Coming Soon' + (versionLang ? '-' + versionLang : ''),
                        //params['homeTitle'],
                        params['siteTitle']
                ]

                res.set('Content-Type', 'text/html;charset=UTF-8')
                return res.end([
                        '<!doctype html>',
                        '<title>' + titleHeaders.join(' | ') + '</title>',
                        '<link rel="shortcut icon" href="/assets/img/favicon.png" />',
                        '<link rel="icon" href="/assets/img/favicon.png" />',
                        '<center><img src="/assets/img/coming-soon.png" /></center>'
                ].join(''))
        }

        init.hasCache(res, req.baseUrl + req.path, next)
}
