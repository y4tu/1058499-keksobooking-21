const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/photos.js",
    "./js/form.js",
    "./js/messages.js",
    "./js/drag-and-drop.js",
    "./js/filter.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
}
