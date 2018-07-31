import {
  param2Obj
} from '@/utils'

const userMap = {
  ['admin-token']: {
    roles: ['admin'],
    token: 'admin-token',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  ['editor-token']: {
    roles: ['editor'],
    token: 'editor-token',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const {
      username
    } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const {
      token
    } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}