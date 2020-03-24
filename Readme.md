# tweet-sentiment

This is simple hack to test tweet sentiment on webtask.io. This application expsoes an http URL to get tweet sentiment of a keyword (of last 100 tweets only). 
This application uses twitter api (to get tweets based on keyword) and watson NLP api (to get sentiment from the tweet.)

## Getting Started

To run this application 

## To setup WebTask Cli

### Prerequisites

Setup Webtask cli from below link
```
    https://webtask.io/docs/wt-cli
```

### Installing



1. Clone the repository

```
git clone https://github.com/rsingh888/tweet-sentiment
```

2. Rename api.secretstemplate to api.secrets and modify all the twitter api and watson nlp api credentials

```
twitter_consumer_key=
twitter_consumer_secret=
twitter_access_token_key=
twitter_access_token_secret=
watson_nlp_username=
watson_nlp_password=
watson_nlp_version=
watson_nlp_basic_auth= #This is basic auth created by postman once you proivide username and password to invoke nlp api

```

### Follow instruction to create a new Webtask and push code to webtask 
```
1. wt init
2. wt create tweet-sentiment.js --secrets-file api.secrets
3. wt serve tweet-sentiment.js --hostname localhost --port 8080

```

### Running

```
To test already created webtask simple hit the below URL with the keyword

```

https://wt-642b657e181e49714ba4c45f50fe4cbd-0.sandbox.auth0-extend.com/tweet-sentiment?keyTerm=FTSE

### Output

It should produce output like below on browser

```
Sentiment for Term: FTSE
Sentiment	Sentiment Count
neutral	58
negative	28
positive	14

```
### Example

![Home page](https://github.com/rsingh888/twt-sentiment/blob/master/Example.JPG?raw=true "Twt Sentiment home page")


## Authors

* **Rajeev Singh** - *Initial work* - (https://github.com/rsingh888)
