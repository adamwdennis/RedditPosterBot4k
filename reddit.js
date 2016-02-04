var reddit = require('redditor');

reddit.get('/r/funny.json', function(err, response) {
    if(err) throw err;
    var posts = response["data"]["children"];
    for (var i = 0; i < posts.length; ++i) {
      var str = JSON.stringify(posts[i]);
      console.log("\n--------------------------------\n");
      console.log(str);
      console.log("\n--------------------------------\n");
    }
});
