module.exports = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: (res)=>{ 
        wx.showToast({
          title: res.errMsg,
          icon:"none"
        })
      }}), ...params);
    });
  }
}