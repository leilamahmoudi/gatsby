import React from 'react'
import { graphql } from 'gatsby'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import { GatsbyImage } from 'gatsby-plugin-image'

const Products = ({ data }) => {
  return (
    <Layout location="/products">
      <Seo title="Product" />
      <Hero title="Product" />
      {data.allContentfulProduct.edges.map((post) => (
        <div>
          <GatsbyImage alt="" image={post.node.image.gatsbyImageData} />
          <h3>{post.node.name}</h3>
          <p>{post.node.price} $</p>
          <p>{post.node.description.description}</p>
        </div>
      ))}
    </Layout>
  )
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
