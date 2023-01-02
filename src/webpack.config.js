module.exports = {
    // ... other webpack config options
    resolve: {
      fallback: {
        "https": require.resolve("https-browserify")
      }
    }
  };