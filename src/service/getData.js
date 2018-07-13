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

/**
 * 获取home商铺列表
 */
export const getShopList = (latitude, longitude, offset, restaurant_category_id = '') => {
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20'
  };
  return fetch('/home/shopList', data);
};


/**
 * 获取home地址
 */
export const getHomeAddress = geohash => fetch('/home/pois/' + geohash);
