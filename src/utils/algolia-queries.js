const pagesQuery = `{
  allContentfulEntry {
    edges {
      node {
        id
        internal {
          contentDigest
        }
        ... on ContentfulProject {
          project: id
          city
          client
          collaboratorsText {
            collaboratorsText
          }
          country
          objectives {
            title
            id
            slug
          }
          primaryText {
            primaryText
          }
          region
          slug
          status
          title
          typology
          year
          internal {
            contentDigest
          }
          tileImage {
            description
            gatsbyImageData(width: 600)
          }
        }
        ... on ContentfulWritingEntry {
          writing: id
          author
          category
          content {
            ... on ContentfulTextModule {
              id
              text {
                childMarkdownRemark {
                  excerpt(pruneLength: 1000)
                }
              }
            }
          }
          date(locale: "America/New_York")
          objectives {
            id
            slug
            title
          }
          slug
          title
          internal {
            contentDigest
          }
          tileTextLong {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulNewsEntry {
          news: id
          category
          content {
            text {
              text
            }
          }
          date(locale: "America/New_York")
          linkOutFromTile
          slug
          externalLink
          title
          internal {
            contentDigest
          }
          tileImage {
            description
            gatsbyImageData(width: 600)
          }
          tileText {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulPublicationEntry {
          publication: id
          content {
            ... on ContentfulTextModule {
              id
              text {
                text
              }
            }
          }
          date(locale: "America/New_York")
          objectives {
            id
            slug
            title
          }
          slug
          title
          internal {
            contentDigest
          }
          tileImage {
            description
            gatsbyImageData(width: 600)
          }
        }
      }
    }
  }
}`

const pageToAlgoliaRecord = edge => {
  const { project, news, writing, publication, id, ...rest } = edge.node
  if (project) {
    return {
      objectID: project,
      searchCategory: "Work",
      ...rest,
    }
  } else if (news) {
    return {
      objectID: news,
      searchCategory: "News",
      ...rest,
    }
  } else if (writing) {
    return {
      objectID: writing,
      searchCategory: "Writing",
      ...rest,
    }
  } else if (publication) {
    return {
      objectID: publication,
      searchCategory: "Publication",
      ...rest,
    }
  } else {
    return { objectID: id, ...rest }
  }
}

const queries = [
  {
    query: pagesQuery,
    transformer: ({ data }) =>
      data.allContentfulEntry.edges.map(edge => pageToAlgoliaRecord(edge)),
    indexName: `Pages`,
  },
]

module.exports = queries
