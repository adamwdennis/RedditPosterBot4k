var imgur = require('./imgur.js');
var scheduler = require('./scheduler');
var reddit = require('./reddit');

var imageRepost = function (post, callback) {
  imgur.repost(post.url, function (error, newUrl) {
    if (error) {
      callback(error);
      return;
    }
    post.url = newUrl;
    callback(null, post);
  });
};

var repostJob = function (jobId) {
  reddit.getHot('all', function (posts) {
    for (var i = 0; i < posts.length; i++) {
      imageRepost(posts[i], function (error, post) {
        console.log(post);
      });
    }
  });

  // scheduler.runTask(jobId, repostTask);
};

// var okTask = function (taskId) {
//   console.log('ok task', taskId);
// };

// var okJob = function (jobId) {
//   scheduler.runAllTasks(jobId, [okTask, okTask, okTask], 5000);
// };

console.log('Shitposter go!')
scheduler.runJob(repostJob, 120000);