import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Layout from "components/Layout"

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  h6 {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`

const PostCategory = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  font-weight: 600;
  color: ${colors.grey600};

  h5 {
    margin-top: 0;
    margin-bottom: 1em;
  }
`

const PostTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;

  h1 {
    margin-top: 0;
  }
`

const PostBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const PostMetas = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};
`

const PostAuthor = styled("div")``

const PostDate = styled("div")``

const Post = ({ post, meta }) => {
  return (
    <>
      <Helmet
        title={`${post.title}`}
        titleTemplate={`%s | ${meta.title}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${post.title}`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout>
        <PostCategory>{post.tags ? post.tags[0] : ""}</PostCategory>
        <PostTitle>
          <h1>{post.title}</h1>
        </PostTitle>
        <PostMetas>
          <PostAuthor>{meta.author}</PostAuthor>
          <PostDate>{post.publishDate}</PostDate>
        </PostMetas>
        {post.heroImage && (
          <PostHeroContainer>
            <img {...post.heroImage.fluid} alt="bees" />
            <PostHeroAnnotation>{post.imageCaption}</PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        ></PostBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const postContent = data.contentfulBlogPost
  const meta = data.site.siteMetadata
  return <Post post={postContent} meta={meta} />
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  query PostQuery($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      tags
      publishDate(formatString: "MMMM Do, YYYY")
      #   imageCaption
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
