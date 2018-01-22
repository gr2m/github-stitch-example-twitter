const cheerio = require('cheerio')
const isSameUrl = require('compare-urls')
const express = require('express')
const got = require('got')
const githubStitch = require('@gr2m/express-github-stitch')

const app = express()
const schema = `
  extend type User {
    twitter: String
  }
`

const resolvers = mergeInfo => ({
  User: {
    twitter: {
      // define requirements for resolver, in this case url + login
      fragment: `fragment UserFragment on User { websiteUrl, login }`,
      // resolve the `twitter` property
      async resolve (parent, args, context, info) {
        const {body} = await got(`twitter.com/${parent.login}`)
        const $ = cheerio.load(body)
        const twitterUrl = $('.ProfileHeaderCard-url [href]').attr('title')

        if (isSameUrl(twitterUrl, parent.websiteUrl)) {
          return parent.login
        }
      }
    }
  }
})

app.use(githubStitch({schema, resolvers}))

app.listen(3000)
