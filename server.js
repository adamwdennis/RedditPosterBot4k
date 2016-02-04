var imgur = require('./imgur.js');


imgur.repost('https://i.imgur.com/FfQUbfS.jpg', function (error, newurl) {
  if (error) {
    return;
  }

  console.log('New url:', newurl);
});