/**
 * 获取定位信息
 * @param  {Function} callback [description]
 */
async function getlocation() {
  return new Promise((resolve) => {
    //成功时
    function onSuccess(position) {
      resolve({
        longitude: position.coords.longitude, //经度
        latitude: position.coords.latitude //纬度
      })
    }
    //失败时
    function onError(error) {
      switch (error.code) {
        case 1:
          alert("位置服务被拒绝");
          break;
        case 2:
          alert("暂时获取不到位置信息");
          break;
        case 3:
          alert("获取信息超时");
          break;
        case 4:
          alert("未知错误");
          break;
      }
    }
    var options = {
      enableHighAccuracy: true,
      maximumAge: 1000
    }
    if (navigator.geolocation) {
      //浏览器支持geolocation
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    } else {
      //浏览器不支持geolocation
      alert('您的浏览器不支持地理位置定位');
    }

  });
}

async function getAddress(longitude, latitude) {
  return new Promise((resolve) => {
    //根据经纬度获取地理位置，不太准确，获取城市区域还是可以的
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(longitude, latitude);
    var gc = new BMap.Geocoder();
    gc.getLocation(point, function(rs) {
      var addComp = rs.addressComponents;
      resolve(addComp.city + addComp.district + addComp.street + addComp.streetNumber)
    });
  })
}

export {
  getAddress,
  getlocation
}
