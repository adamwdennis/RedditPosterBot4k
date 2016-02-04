var CLIENT_ID = "uK9u8Ugo2UPEQQ";
var CLIENT_SECRET = "DjqfLNlmnyd9l9RBnUrN2-08b18";
var CLIENT_SECRET2 = "Zn4_NTgLIJ4wcynXrcvXL1jW0oE";
var CLIENT_USERNAME = "shitp4k";
var CLIENT_PASSWORD = "dkSh77xdzTDhgfxQ(4eg3Yj2hjupqe";
var APP_ID = "53TBRNFR-8PyoA";
var APP_SECRET = "Zn4_NTgLIJ4wcynXrcvXL1jW0oE";
var APP_REDIRECT_URI = "http://127.0.0.1/oauth/callback";

var RedditApi = require('reddit-oauth');
var reddit = new RedditApi({
    app_id: APP_ID,
    app_secret: APP_SECRET,
    redirect_uri: APP_REDIRECT_URI
});

// Authenticate with username/password
reddit.passAuth(
    CLIENT_USERNAME,
    CLIENT_PASSWORD,
    function (success) {
        if (success) {
            // Print the access token we just retrieved
            //console.log(reddit.access_token);
            if (!reddit.isAuthed()) {
              console.log("USER IS NOT AUTHED!");
            }

            reddit.get('/api/needs_captcha', {}, function(err, res, body) {
              if (err) throw err;

              if (body == 'true') {

                reddit.post('/api/new_captcha', { api_type: 'json'}, function(err, res, body) {
                // Call authenticated POST endpoint
                  if (err) throw err;
                  var iden = JSON.parse(res.body)["json"]["data"]["iden"];

                  console.log("get /captcha/" + iden);
                  reddit.get('/captcha/'+iden, {}, function(err, res, body) {

                    console.log(res);

                    if (false) {
                      console.log("attempting to submit new post");
                      reddit.get('/api/submit', {
                        api_type: 'json',
                        sr: 'funny',
                        kind: 'link',
                        extension: 'json',
                        title: 'MFW my water bottle leaked while camping',
                        url: 'http://i.imgur.com/zapYM0d.jpg'
                      }, function(err, res, body) {
                        if (err) throw err;
                        console.log(body);
                      });
                    }
                  });
                });
              } 
           });
            
        }
    }
);

// Get the OAuth URL to redirect users to
// Scopes are defined here: https://github.com/reddit/reddit/wiki/OAuth2
reddit.oAuthUrl('some_state', 'identity');


// Returns true if access token exists

/*
// Force a refresh of the access token using the refresh token
reddit.refreshToken(
    function (success) {
        // Print the access token we just retrieved
        console.log(reddit.access_token);
    }
);

// Call authenticated GET endpoint
reddit.get(
    '/api/v1/me',
    {},
    function (error, response, body) {
        console.log(error);
        console.log(body);
    }
);

// Call authenticated GET listing endpoint with easy pagination
reddit.get(
    '/user/Aihamh/submitted',
    {},
    function (error, response, body, next) {
        console.log(error);
        console.log(body);

        // next is not null, therefore there are more pages
        if (next) {
            next(); // Invoke next to retrieve the next page
        }
    }
);

// Call authenticated POST endpoint
reddit.post(
    '/api/comment',
    {
        api_type: 'json',
        text: 'Hello World!',
        thing_id: 'abc123'
    },
    function (error, response, body) {
        console.log(error);
        console.log(body);
    }
);
*/
