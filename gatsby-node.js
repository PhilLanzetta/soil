/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query GetData {
        allContentfulProject {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulObjective {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulWritingEntry {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulPublicationEntry {
          edges {
            node {
              slug
            }
          }
        }
        allContentfulNewsEntry(filter: { linkOutFromTile: { ne: true } }) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  const projects = result.data.allContentfulProject.edges

  const objectives = result.data.allContentfulObjective.edges

  const writing = result.data.allContentfulWritingEntry.edges

  const news = result.data.allContentfulNewsEntry.edges

  const publication = result.data.allContentfulPublicationEntry.edges

  projects.forEach(({ node }) => {
    const projectSlug = node.slug
    createPage({
      path: `/work/${projectSlug}`,
      component: path.resolve(`./src/templates/singleProject.js`),
      context: {
        slug: projectSlug,
      },
    })
  })

  objectives.forEach(({ node }) => {
    const objectiveSlug = node.slug
    createPage({
      path: `/objective/${objectiveSlug}`,
      component: path.resolve(`./src/templates/singleObjective.js`),
      context: {
        slug: objectiveSlug,
      },
    })
  })

  writing.forEach(({ node }) => {
    const writingSlug = node.slug
    createPage({
      path: `/writing/${writingSlug}`,
      component: path.resolve(`./src/templates/singleWriting.js`),
      context: {
        slug: writingSlug,
      },
    })
  })

  publication.forEach(({ node }) => {
    const pubSlug = node.slug
    createPage({
      path: `/publications/${pubSlug}`,
      component: path.resolve(`./src/templates/singlePublication.js`),
      context: {
        slug: pubSlug,
      },
    })
  })

  news.forEach(({ node }) => {
    const newsSlug = node.slug
    createPage({
      path: `/news/${newsSlug}`,
      component: path.resolve(`./src/templates/singleNews.js`),
      context: {
        slug: newsSlug,
      },
    })
  })
}
