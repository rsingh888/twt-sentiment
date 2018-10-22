var Twitter = require('twitter');
var request = require("request");


var client, respons, searchTerm;

  var watson_options = { method: 'POST',
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze',
    qs: { version: '2018-03-16' },
   headers: 
   { Authorization: '',
     'Content-Type': 'application/json' },
    body: 
    { text: '',
      features: 
        { keywords: { emotion: true, sentiment: true, limit: 2 } } },
    json: true };


module.exports = function (context, req, res) {
  respons = res;
    client = new Twitter({
        consumer_key: context.secrets.twitter_consumer_key,
        consumer_secret: context.secrets.twitter_consumer_secret,
        access_token_key: context.secrets.twitter_access_token_key,
        access_token_secret: context.secrets.twitter_access_token_secret
      });
      
    watson_options.headers.Authorization = context.secrets.watson_nlp_basic_auth;
    searchTerm = context.query.keyTerm;
    getTweets(res, context.query.keyTerm);
    res.writeHead(200, { 'Content-Type': 'text/html '});
  };
  

var sentiment_store = {} ;
function getTweets(res, keyTerm){
var tweet_store = [];
  client.get('search/tweets', {q: keyTerm, count: 100, lang: 'en'}, function(error, tweets, response) {
    let tweetStatuses = tweets.statuses;
    if(error) {
      console.log(error);
    }
    if(tweetStatuses)
    {
      tweetStatuses.forEach(function (tt) {
        tweet_store.push(tt.text);
      });
      var tweets_processed = 0;
      tweet_store.forEach(async function (tt) {
        watson_options.body.text = tt;
        await request(watson_options, function (err, resp, body) {
          tweets_processed++;
          if (err)
          {
            console.log(err);
            throw new Error(err);
          } 
          if(body.keywords)
          {
            sentiment_store[body.keywords[0].sentiment.label] = sentiment_store[body.keywords[0].sentiment.label] || 0;
            sentiment_store[body.keywords[0].sentiment.label]++;
          }
          if(tweets_processed === tweet_store.length)
            callback();
        });

      });
    }
  });
}


function callback()
{
  console.log("I AM DONE DUDE" );
  console.log(sentiment_store);
  respons.write('<h1> Sentiment for Term: ' + searchTerm + '</h1>');
  respons.write('<table>');
  respons.write('<tr><th> Sentiment </th>    <th> Sentiment Count</th>');
  Object.keys(sentiment_store).forEach(function(key) {
    respons.write('<tr>');
    respons.write('<td>' + key + '</td>');
    respons.write('<td>' + sentiment_store[key] + '</td>');
    respons.write('</tr>');
  });
  // respons.end(JSON.stringify(sentiment_store));
  respons.end('</table>');
}
