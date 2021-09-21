const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Gatsby + WordPress Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        verbose: true,
        url: 'https://devcasa.wpengine.com/graphql',
        develop: {
          hardCacheMediaFiles: true,
          hardCacheData: false,
        },
        type: {
          Page: {
            limit: 300,
            first: 300,
          },
          User: {
            exclude: true,
          },
        },
        html: {
          useGatsbyImage: false,
          createStaticFiles: false,
        },
        schema: {
          timeout: 6000000,
          perPage: 50, // currently set to 100
          requestConcurrency: 1, // currently set to 15
          previewRequestConcurrency: 2, //
        },
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
