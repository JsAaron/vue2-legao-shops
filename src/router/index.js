import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login')), 'login')

export default [
	{
		path     : '/',
		name     : '登录',
		hidden   : true,
		component: login
	}
]
