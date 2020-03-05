const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['@fortawesome']); // pass the modules you would like to see transpiled


module.exports = withTM(
  withSass(withImages(
    withCSS({
      cssLoaderOptions: { // this solves the issue
        url: false
      }
    })
  ))
)
