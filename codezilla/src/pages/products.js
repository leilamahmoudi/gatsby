import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

class Products extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulProduct.edges')

    return (
      <Layout location={this.props.location}>
        <Seo title="Blog" />
        <Hero title="Blog" />
        <h1>
          {posts.map((post) => (
            <p>{post.node.name}</p>
          ))}
        </h1>
        {/* <ArticlePreview posts={posts} /> */}
      </Layout>
    )
  }
}

export default Products

export const pageQuery = graphql`
  query ProductsQuery {
    allContentfulProduct {
      edges {
        node {
          childContentfulProductDescriptionTextNode {
            id
          }
          name
          price
          description {
            description
          }
          image {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
`
