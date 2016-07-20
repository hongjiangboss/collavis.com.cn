#!/usr/bin/env node
// Copyright 2016 The HongJiang Library Project Authors. All right reserved.
// Use of this source code is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// Ａｄｍｉｎｉｓｔｒａｔｏｒ服務之管理員賬號初始化
//
// @authors hjboss <hongjiangproject@gmail.com> 2016-07-05 13:45:04 CST $$
// @version 0.1.0
const init = require('../administrator/configure')
const schema = require('../schema')(init)

const email = 'admin@collavis.com.cn'//'hongjiangproject@gmail.com'
const username = 'administrator'// 'hjboss'
const password = init.utils.HashSha512('1qazxsw2')


schema.Administrator.findOne({
        where: {email: email}
}).then(function (data) {
        data = data || {}
        console.log(data)
        if (data['email']) {
                return console.log(email + ' existsed')
        }

        schema.Administrator.create({
                email: email,
                username: username,
                password: password,
                registerTime: Date.now(),
                registerIP: '127.0.0.1'
        })
        console.log(email + ' installed success')
})
