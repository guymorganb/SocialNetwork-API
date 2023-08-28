<h1 align="center">Welcome to socialnetwork-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/guymorganb/socialnetwork-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/guymorganb/socialnetwork-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/guymorganb/socialnetwork-api/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/guymorganb/socialnetwork-api" />
  </a>
</p>

> A simple API using MongoDB & Mongoose

### 🏠 [Homepage](https://github.com/guymorganb/SocialNetwork-API)

### 💫 [Demo] (https://drive.google.com/file/d/1-eBjXl1JrGjQ_rXr1G8QmDIhR2MRYBLn/view?usp=sharing)

## Usage

```sh
npm run start
```

## Author

👤 **guymorganb**

* Github: [@guymorganb](https://github.com/guymorganb)
* LinkedIn: [@guymorganb](https://linkedin.com/in/guymorganb)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/guymorganb/socialnetwork-api/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [guymorganb](https://github.com/guymorganb).<br />
This project is [MIT](https://github.com/guymorganb/socialnetwork-api/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

***
- User Story
  
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

- Acceptance Criteria

GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
