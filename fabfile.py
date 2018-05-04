# -*- coding:UTF-8 -*-
from datetime import datetime
from fabric.api import env, local, run, put, cd, settings
import sys
import os
import json
import codecs

env.user = 'root'

env.password = 'host_密码'

# 如果有多个主机，fabric会自动依次部署
env.hosts = ['host_地址']


def build():
    # # 编译器前端
    # local('cd frontend && npm run build')
    # 编译器后端
    local('cd backend && go build')

    # local('rm -rf backend/static')
    # local('rm -rf backend/templates')
    # local('mkdir backend/templates')
    # local('cp frontend/dist/index.html backend/templates/')
    # local('mv frontend/dist backend/static')

    # # hash
    # md5css = os.popen(
    #     "md5sum backend/static/index.css | awk '{print $1}'").read().replace('\n', '')
    # os.popen("mv backend/static/index.css backend/static/" +
    #          md5css + "index.css")

    # md5js = os.popen(
    #     "md5sum backend/static/index.js | awk '{print $1}'").read().replace('\n', '')
    # os.popen("mv backend/static/index.js backend/static/" +
    #          md5js + "index.js")

    # web = codecs.open("backend/templates/index.html",
    #                   'r', encoding='UTF-8')
    # hashWeb = web.read().replace('href="/index.css"', 'href="/static/' + md5css +
    #                              'index.css"').replace('src="/index.js"', 'src="/static/' + md5js + 'index.js"')
    # web.close()

    # web = codecs.open("backend/templates/index.html",
    #                   'w', encoding='UTF-8')
    # web.write(hashWeb)
    # web.close()

    # # jwt = os.popen("md5sum backend/backend | awk '{print $1}'").read().replace('\n','')
    # # jwt = md5js
    # # f = open("backend/config.json",'r',encoding='UTF-8')
    # # config = json.load(f)
    # # f.close()
    # # config['jwt'] = jwt
    # # f = open("backend/config.json",'w',encoding='UTF-8')
    # # json.dump(config,f)
    # # f.close()

    # with cd('/root/app'):
    #     run('rm -rf static')
    #     run('rm -rf templates')
    #     run('mkdir static')
    #     run('mkdir templates')

    # 关闭服务器服务
    run('supervisorctl stop SimStoreApp')
    # 上传服务器
    put('backend/backend', '/root/app/backend', mode=0777)
    # put('backend/static/*', '/root/app/static/')
    # put('backend/templates/*', '/root/app/templates/')
    # 重启服务器服务
    run('supervisorctl start SimStoreApp')


def test():
    print('test hello')
