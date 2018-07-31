import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en'
  },
  mutations: {

  },
  actions: {

  }
}

export default app