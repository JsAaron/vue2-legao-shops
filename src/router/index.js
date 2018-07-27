import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login')), 'login')

export default [
	{
		path: '/',
		component: App,
		children: [
			//地址为空时跳转home页面
			{
				path: '',
				redirect: '/login'
			},
			{
				path: '/login',
				component: login
			}
		]
	}
]
