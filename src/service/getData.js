import fetch from '../config/fetch'

/**
 * 获取默认定位地址
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});
