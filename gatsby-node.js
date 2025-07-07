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
      }
    `
  )

  const projects = result.data.allContentfulProject.edges

  const objectives = result.data.allContentfulObjective.edges

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
      component: path.resolve(`./src/templates/objective.js`),
      context: {
        slug: objectiveSlug,
      },
    })
  })
}
