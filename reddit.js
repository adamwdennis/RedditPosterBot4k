var reddit = require('redditor');

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

reddit.get('/r/all.json', function(err, response) {
    if(err) throw err;

    var posts = response["data"]["children"];
    var allowedExtensions = [".jpg",".png",".gif"];

    for (var i = 0; i < posts.length; ++i) {
      var post = posts[i]["data"];

      var url = JSON.stringify(post["url"]).replace(/['"]+/g, '');
      var title = JSON.stringify(post["title"]).replace(/['"]+/g, '');

      var allowedExtension = false;

      for (var j = 0; j < allowedExtensions.length; ++j) {
        var extension = allowedExtensions[j];
        if (url.endsWith(extension)) {
          allowedExtension = true;
        }
      }
      if (allowedExtension) {
        console.log("\n--------------------------------\n");
        console.log(title);
        console.log(url);
        console.log("\n--------------------------------\n");
      }
    }
});
