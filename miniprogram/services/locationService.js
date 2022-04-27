var positionService = {
  /**
   * 获取用户当前位置。
   * @param {Function} callback 回调函数。
   */
  getUserLocation: function (callback) {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        callback(res)
      }
    })
  },

  /**
   * 求两个位置之间的距离。
   * @param {Object} pos1 位置1。
   * @param {Object} pos2 位置2。
   */
  getDistance: function (pos1, pos2) {
    let lat1 = pos1.latitude;
    let lng1 = pos1.longitude;
    let lat2 = pos2.latitude;
    let lng2 = pos2.longitude;

    var radLat1 = (lat1 * Math.PI) / 180.0;
    var radLat2 = (lat2 * Math.PI) / 180.0;

    var a = radLat1 - radLat2;
    var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10) / 10;
    return s;
  },

  /**
   * 从地图选取位置。
   * @param {Function} callback 回调函数。
   */
  chooseLocation:function (callback) {
    wx.chooseLocation({
      success(res){
        callback(res)
      }  
    })
  }
}
module.exports = positionService;