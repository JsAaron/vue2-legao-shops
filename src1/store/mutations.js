import {
  RECORD_ADDRESS,
  ADD_CART,
  SAVE_GEOHASH
} from './mutation-types.js'


export default {
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
}
