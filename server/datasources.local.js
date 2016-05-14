var mongoUri = process.env.MONGOLAB_URI;

module.exports = {
  mongodb: {
    defaultForType: "mongodb",
    connector: "mongodb",
    url: mongoUri
  }
};
