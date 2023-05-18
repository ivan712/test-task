module.exports = {
    secret: "MY_JWT_SECRET",
    mongodb: {
      uri: 'mongodb://mongo:27017/blogs'
    },
    crypto: {
      iterations: 12000,
      length: 128,
      digest: 'sha512',
    },
  };
  