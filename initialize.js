// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定義Ｗｅｂ應用的常用方法和默認配置
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const fs = require('fs')
const pm = require('pm')
const url = require('url')
const http = require('http')
const path = require('path')
const crypto = require('crypto')
const logger = require('morgan')
const express = require('express')
const session = require('express-session')
const jugglingdb = require('jugglingdb')
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars')
const fileStreamRotator = require('file-stream-rotator')

const defaultSettings = {
        debug: process.env.NODE_ENV !== 'production',
        name: 'Initialize',
        host: process.env.NODE_ENV !== 'production' ? '0.0.0.0' : '127.0.0.1',
        port: 3000,
        masters: [],
        routers: {},
        lang: null,
        db: null,
        cache: null,
        session: null,
        extname: '.html',
        tempdir: path.join(__dirname, 'temp')
}

function Initialize (configure, root) {
        this.APP_ROOT = root
        this.settings = defaultSettings

        for (let field in configure) {
                this.settings[field] = configure[field]
        }
}

Initialize.prototype.utils = {}
Initialize.prototype.error = {}

Initialize.prototype.utils.update = function (configure, dist) {
        for (let field in dist) {
                configure[field] = dist[field]
        }
        return configure
}

Initialize.prototype.utils.len = function (dist) {
        var length = 0

        if (dist) {
                if (dist instanceof Array) {
                        return dist.length
                }

                for (let field in dist) {
                        length += 1
                }
        }

        return length
}

Initialize.prototype.utils.Hash = function (text, hash) {
        return crypto.createHash(hash || 'md5').update(text).digest('hex')
}

Initialize.prototype.utils.HashMD5 = function (text) {
        return crypto.createHash('md5').update(text).digest('hex')
}

Initialize.prototype.utils.HashSha256 = function (text) {
        return crypto.createHash('sha256').update(text).digest('hex')
}

Initialize.prototype.utils.HashSha512= function (text) {
        return crypto.createHash('sha512').update(text).digest('hex')
}

Initialize.prototype.utils.JSONParse = function (json) {
        try {
                return JSON.parse(json)
        } catch (err) {}
        return {}
}

Initialize.prototype.utils.JSONStringify = function (json) {
        return JSON.stringify(json)
}

Initialize.prototype.utils.GET = function (req, field) {
        return req.query[field] || ''
}

Initialize.prototype.utils.POST = function (req, field) {
        return req.body[field] || ''
}

Initialize.prototype.utils.REQUEST = function (req, field) {
        return req.body[field] || req.query[field] || ''
}

Initialize.prototype.utils.SESSION = function (req, objects) {
        if (typeof objects === 'string') {
                return req.session[objects]
        }

        for (let field in objects) {
                req.session[field] = objects[field]
        }
        return req
}

Initialize.prototype.utils.init_session = function (req, sessionid) {
        sessionid = sessionid || req.query['_token'] || req.body['_token']

        if (sessionid) {
                req.sessionID = sessionid
        }

        return req
}

Initialize.prototype.utils.acceptLanguage = function (headers) {
        var buffer = (headers['accept-language'] || headers).split(';')[0].split(',')[0]
        return {
                'long': buffer,
                'short': buffer.split('-')[0]
        }
}

Initialize.prototype.error.common = function (code) {
        return [
                '<html>',
                '<head><title>' + code + '</title></head>',
                '<body bgcolor="white">',
                '<center><h1>' + code + '</h1></center>',
                '<hr><center>nginx/1.4.6</center>',
                '</body>',
                '</html>'
        ].join('')
}

Initialize.prototype.error.notFound = function () {
        return this.common('404 Not Found')
}

Initialize.prototype.error.internalServer = function () {
        return this.common('500 Internal Server Error')
}

Initialize.prototype.hasCache = function (res, pathname, next) {
        const init = this

        if (!init.settings.cache) {
                return next()
        }

        init.__cacheSchema().findOne({
                where: {pathname: pathname}
        }).then(function (data) {
                if (!data || !data['pathname']) {
                        return next()
                }

                var cacheTimout = init.settings.cache['timeout'] || 3600000
                if (Date.now() - data['timestamp'] > cacheTimout) {
                        return data.destroy(function () {
                                next()
                        })
                }

                res.set('Content-Type', 'text/html;charset=UTF-8')
                res.end(data['content'])
        })
}

Initialize.prototype.renderCache = function (res, views, params) {
        const init = this
        res.render(views, params, function (err, html) {
                if (init.settings.cache) {
                        init.__cacheSchema().create({
                                pathname: params['cacheKey'],
                                timestamp: Date.now(),
                                content: html
                        })
                }

                res.set('Content-Type', 'text/html;charset=UTF-8')
                res.end(html)
        })
}

Initialize.prototype.removeCache = function () {
        if (this.settings.cache) {
                this.__cacheSchema().destroyAll()
        }
}

Initialize.prototype.langDefault = function () {
        this.settings.lang = this.settings.lang || {}
        return this.settings.lang['init'] || 'zh'
}

Initialize.prototype.locale = function (lang, field) {
        if (typeof lang === 'undefined') {
                return this.__locales[this.langDefault()]
        }
        if (typeof field === 'undefined') {
                return this.__locales[lang]
        }
        return (this.__locales[lang] || {})[field]
}

Initialize.prototype.urlpath = function (pathname) {
        return url.format({
                protocol: 'http:',
                hostname: this.settings.host,
                port: this.settings.port,
                pathname: pathname + this.settings.extname,
                slashes: true
        })
}

// 設置自定義ＵＲＬ路由映射之列表
Initialize.prototype.router = function (configure, fn) {
        var routers = express.Router()
        var init = this

        configure.forEach(function (router) {
                var method = router[0].toLowerCase()
                var controller = path.join(init.APP_ROOT, router[2] + '.js')

                if (fs.existsSync(controller)) {
                        if (typeof fn === 'function') {
                                routers[method](router[1], fn)
                        }

                        if (typeof router[3] === 'function') {
                                routers[method](router[1], router[3])
                        }

                        routers[method](router[1], require(controller))
                }
        })

        return routers
}

Initialize.prototype.renderJSON = function (res, params) {
        res.set('Content-Type', 'application/json;charset=UTF-8')
        res.end(this.utils.JSONStringify(params))
}

// 設置自定義數據儲存之模式列項
Initialize.prototype.schema = function (name, fields, configure) {
        configure = configure || this.settings.db
        return (new jugglingdb.Schema(
                this.__jugglingdbProtocol(configure['type']),
                this.__jugglingdb(configure)
        )).define(name, fields)
}

// 創建一個單實例的ＨＴＴＰ服務器
Initialize.prototype.httpd = function () {
        const init = this
        http.createServer(this.__app()).listen(init.settings.port, function () {
                console.log(init.settings.name + ' running at port ' + init.settings.port)
        })
}

// 創建Ｍａｓｔｅｒ－ｗｏｒｋｅｒ型ＨＴＴＰ服務器之主進程
Initialize.prototype.master = function (root, script) {
        var master = pm.createMaster({
                pidfile: path.join(this.settings.tempdir, this.settings.name + '.pid')
        })
        master.register(this.settings.name, path.join(root, script), {
                listen: this.settings.masters,
                addr: '0.0.0.0'
        })
        master.dispatch()
}

// 創建Ｍａｓｔｅｒ－ｗｏｒｋｅｒ型ＨＴＴＰ服務器的Ｗｏｒｋｅｒ服務
Initialize.prototype.worker = function () {
        var worker = http.createServer(this.__app())
        pm.createWorker().ready(function (socket, port) {
                worker.emit('connection', socket)
        })
}

Initialize.prototype.__app = function () {
        var app = express()
        var init = this

        app.set('env', process.env.NODE_ENV)
        app.set('port', init.settings.port)

        app.use(compression())
        app.use('/public', express.static(path.join(__dirname, '/public')))
        app.use('/assets', express.static(path.join(init.APP_ROOT, '/assets')))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(cookieParser())

        var logDir = path.join(this.settings.tempdir, this.settings.name)
        fs.existsSync(this.settings.tempdir) || fs.mkdirSync(this.settings.tempdir)
        fs.existsSync(logDir) || fs.mkdirSync(logDir)
        if (init.settings.debug) {
                app.use(logger('combined'))
        } else {
                var logOptions = {
                        stream: fileStreamRotator.getStream({
                                date_format: 'YYYYMMDD',
                                filename: path.join(logDir, this.settings.name + '-%DATE%.log'),
                                frequency: 'daily',
                                verbose: false
                        })
                }

                app.use(logger('combined', logOptions))
        }


        if (init.settings.session) {
                var sessionOptions = {
                        key: init.settings.session['token'] || '_token',
                        secret: init.settings.session['secret'] || '5uperSEC537(key)',
                        resave: true,
                        saveUninitialized: true,
                        cookie: {
                                maxAge: init.settings.session['maxage'] || 86400000
                        }
                }

                if (init.settings.session['store']) {
                        sessionOptions['store'] = this.__sessionStore(init.settings.session['store'])
                }

                app.set('trust proxy', init.settings.debug === false)
                app.use(session(sessionOptions))
        }

        if (init.settings.lang) {
                var locales = init.settings.lang['locales'] || []

                init.__locales = {}
                locales.forEach(function (lang) {
                        var localefile = path.join(init.APP_ROOT, 'locales', lang + '.js')

                        if (fs.existsSync(localefile)) {
                                init.__locales[lang] = require(localefile)
                        }
                })
        }

        var viewDir = path.join(this.APP_ROOT, 'views')
        var viewHelpers = path.join(viewDir, 'helpers/helpers.js')
        var viewOptions = {
                defaultLayout: 'main',
                layoutsDir: path.join(viewDir, 'layouts'),
                partialsDir: path.join(viewDir, 'partials'),
                helpers: init.__defaultHelpers()
        }
        if (fs.existsSync(viewHelpers)) {
                viewOptions['helpers'] = init.utils.update(viewOptions['helpers'], require(viewHelpers))
        }
        app.engine('handlebars', handlebars(viewOptions))
        app.set('view engine', 'handlebars')
        app.set('views', viewDir)
        app.set('view cache', init.settings.debug === false)

        for (let prefix in init.settings.routers) {
                var route = path.join(init.APP_ROOT, init.settings.routers[prefix] + '.js')

                if (fs.existsSync(route)) {
                        app.use(prefix, require(route))
                }
        }

        app.use(function (req, res, next) {
                var err = new Error('404 Not Found')
                err.status = 404
                next(err)
        })
        app.use(function (err, req, res, next) {
                res.status(err.status || 500)

                if (init.settings.debug) {
                        if (err.status !== 404) {
                                console.log(err)
                        }
                        return res.end(err.message)
                }

                if (err.status == 404) {
                        return res.end(init.error.notFound())
                }

                return res.end(init.error.internalServer())
        })

        return app
}

Initialize.prototype.__sessionStore = function (configure) {
        configure = configure || {}

        switch (configure['type']) {
                case 'redis':
                        return new (require('connect-redis')(session))({
                                host: configure['host'] || '127.0.0.1',
                                port: configure['port'] || 6379,
                                pass: configure['pass'] || '',
                                db: configure['name'] || 0
                        })

                case 'rethinkdb':
                        configure['servers'] = configure['servers'] || []
                        configure['options'] = configure['options'] || {}
                        if (configure['servers'].length === 0) {
                                configure['servers'] = [{
                                        host: configure['host'] || '127.0.0.1',
                                        port: configure['port'] || 28015
                                }]
                        }
                        return new (require('express-session-rethinkdb')(session))({
                                connectOptions: {
                                        servers: configure['servers'],
                                        db: configure['name'] || 'test',
                                        user: configure['user'] || 'admin',
                                        password: configure['pass'] || '',
                                        discovery: false,
                                        pool: true,
                                        buffer: configure['options']['buffer'] || 50,
                                        max: configure['options']['max'] || 1000,
                                        timeout: configure['options']['timeout'] || 20,
                                        timeoutError: configure['options']['timeoutError'] || 1000
                                },
                                table: configure['table'] || 'session',
                                sessionTimeout: configure['options']['timeout'] || 86400000,
                                flushInterval: 6000,
                                debug: this.settings.debug
                        })
        }
}

Initialize.prototype.__jugglingdb = function (configure) {
        configure = configure || {}

        switch (configure['type']) {
                case 'redis':
                        return this.__jugglingdbConnect({
                                type: 'redis',
                                host: configure['host'] || '127.0.0.1',
                                port: configure['port'] || 6379,
                                pass: configure['pass'] || '',
                                name: configure['name'] || 0
                        })

                case 'rethinkdb':
                        configure['options'] = configure['options'] || {}
                        return {
                                host: configure['host'] || '127.0.0.1',
                                port: configure['port'] || 28015,
                                username: configure['user'] || 'admin',
                                password: configure['pass'] || '',
                                database: configure['name'] || 'test',
                                poolMin: configure['options']['poolMin'] || 1,
                                poolMax: configure['options']['poolMax'] || 10
                        }

                case 'arangodb':
                        return this.__jugglingdbConnect({
                                type: 'http',
                                host: configure['host'] || '127.0.0.1',
                                port: configure['port'] || 8529,
                                user: configure['user'] || 'root',
                                pass: configure['pass'] || '',
                                name: configure['name'] || '_system'
                        })
        }

        return {}
}

Initialize.prototype.__jugglingdbConnect = function (configure) {
        configure = configure || {}
        return {
                url: url.format({
                        protocol: this.__jugglingdbProtocol(configure['type']),
                        host: configure['host'] + (configure['port'] ? ':' + configure['port'] : ''),
                        auth: configure['user'] + (configure['pass'] ? ':' + configure['pass'] : ''),
                        pathname: '/' + configure['name'],
                        slashes: true
                })
        }
}

Initialize.prototype.__jugglingdbProtocol = function (name) {
        switch (name) {
                case 'rethinkdb':
                        return 'rethink'

                case 'arangodb':
                        return 'arango'
        }
        return name
}

Initialize.prototype.__defaultHelpers = function () {
        return {
                ifEq: function (x, y, options) {
                        if (x === y) {
                                return options.fn(this)
                        }

                        return options.inverse(this)
                },
                assign: function (text, empty) {
                        return text || empty
                },
                resource: function (client, uri) {
                        var paths = ['file://' + client['root']]

                        if (uri.indexOf('../assets') !== -1) {
                                uri = uri.replace('../', '')
                        } else {
                                paths.push('custom')
                        }

                        uri.split('/').forEach(function (buf) {
                                paths.push(buf)
                        })

                        return paths.join(client['platform'] === 'win32' ? '\\' : '/')
                },
                date_format: function (t) {
                        t = t === '0' ? (new Date()) : t
                        return [
                                [
                                        t.getFullYear(),
                                        (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1),
                                        t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
                                ].join('-'),
                                [
                                        t.getHours() < 10 ? '0' + t.getHours() : t.getHours(),
                                        t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes(),
                                        t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
                                ].join(':')
                        ].join(' ')
                }
        }
}

Initialize.prototype.__cacheSchema = function () {
        return this.schema('cache', {
                pathname:       { type: String, index: true             },
                timestamp:      { type: Date,   default: Date.now()     },
                content:        { type: jugglingdb.Schema.Text          }
        }, this.cache['store'] || this.db)
}

module.exports.configure = function (configure, root) {
        return new Initialize(configure, root)
}
