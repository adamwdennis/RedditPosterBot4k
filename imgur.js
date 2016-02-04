var imgurapi = require('imgur-node-api');
imgurapi.setClientID('4bcf68d844a6de2');

module.exports.repost = function (url, callback) {
  imgurapi.upload(url, function (error, response) {
    if (error) {
      console.error(error);
    } else if (response.status > 204) {
      console.error(JSON.stringify(response));
      callback(response.data.error);
      return;
    }
    
    callback(error, response.data.link)
  });
};