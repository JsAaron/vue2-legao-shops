import fetch from '../config/fetch'

/**
 * 获取默认定位地址
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});

/**
 * 首页热点城市
 */
export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});

/**
 * 获取首页所有城市
 */
export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
});
