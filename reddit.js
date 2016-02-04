var reddit = require('redditor');
      
var ALLOWED_EXT = [".jpg",".png",".gif"];

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var parsePosts = function (posts, allowedExtensions, each, done) {
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i].data;

    var url = JSON.stringify(post.url).replace(/['"]+/g, '');
    var title = JSON.stringify(post.title).replace(/['"]+/g, '');
    var subreddit = JSON.stringify(post.subreddit).replace(/['"]+/g, '');

    for (var j = 0; j < allowedExtensions.length; ++j) {
      var extension = allowedExtensions[j];
      if (url.endsWith(extension)) {
        each(title, subreddit, url);
      }
    }
  }

  done();
};

module.exports.getHot = function (subreddit, callback) {
  console.log("Fetching hot posts from r/" + subreddit);
  var results = [];
  reddit.get('/r/'+subreddit+'/hot.json', function(err, response) {
      if(err) throw err;
      var posts = response["data"]["children"];
      parsePosts(posts, ALLOWED_EXT,
        function (title, subreddit, url) {
          // Each post
          results.push({title: title, subreddit: subreddit, url: url});
        },
        function () {
          // Done
          console.log('Done fetching from ', subreddit);
          callback(results);
        }
      );
  });
};
