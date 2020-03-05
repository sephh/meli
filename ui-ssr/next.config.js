const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const withFonts = require('next-fonts')
const withTM = require('next-transpile-modules')(['@fontawesome']); // pass the modules you would like to see transpiled

module.exports = withFonts(
  withTM(
    withSass(withImages(
      withCSS({
        cssLoaderOptions: { // this solves the issue
          url: false
        },
      })
    ))
  )
)
