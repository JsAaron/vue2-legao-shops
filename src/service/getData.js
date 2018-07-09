import fetch from '../config/fetch'

/**
 * 获取默认定位地址
 */
export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});

/**
 * 获取home页面食品分类列表
 */
export const getFoodTypes = geohash => fetch('/home/foodType');
