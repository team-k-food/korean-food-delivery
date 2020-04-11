import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Content } from 'layouts';
import { TagsBlock, SEO } from 'components';
import '../styles/prism';

export const query = graphql`
    query($pathSlug: String!, $folder: String!) {
        markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
            html
            excerpt
            frontmatter {
                title
                tags
                cover {
                    childImageSharp {
                        fluid(maxWidth: 1000, quality: 100) {
                            ...GatsbyImageSharpFluid_noBase64
                        }
                    }
                }
            }
        }
        images: allFile(
            filter: {
                base: { regex: "/menu/" }
                extension: { regex: "/(jpg)|(png)|(jpeg)/" }
                relativeDirectory: { eq: $folder }
            }
        ) {
            nodes {
                childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                        ...GatsbyImageSharpFluid_noBase64
                    }
                }
            }
        }
    }
`;

const Wrapper = styled.div`
    padding: 3rem 0 0 0;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

const HeroImageContainer = styled.div`
    background-color: ${props => props.theme.colors.black.base};
    margin: 4rem 0 0 0;
`;

const HeroImageWrapper = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    height: 300px;
    overflow: hidden;
    @media (min-width: ${props => props.theme.breakpoints.m}) {
        height: 500px;
    }
`;

const ContentWrapper = styled.div`
    padding: 0 1rem;
    @media (min-width: ${props => props.theme.breakpoints.m}) {
        padding: 0;
    }
`;

const Post = ({ data }) => {
    const { html, frontmatter, excerpt } = data.markdownRemark;
    const { title, tags, path } = frontmatter;
    const image = frontmatter.cover.childImageSharp.fluid;
    return (
        <Layout>
            <SEO
                title={title}
                description={excerpt || ' '}
                banner={frontmatter.cover.childImageSharp.fluid.src}
                pathname={path}
                article
            />
            <HeroImageContainer>
                <HeroImageWrapper>
                    <Img fluid={image} />
                </HeroImageWrapper>
            </HeroImageContainer>
            <Wrapper>
                <ContentWrapper>
                    <h1>{title}</h1>
                    <TagsBlock list={tags || []} />
                    <Content input={html} />
                </ContentWrapper>
                {data.images.nodes &&
                    data.images.nodes.map(image => {
                        const fluid = image.childImageSharp.fluid;
                        return <Img key={fluid.src} fluid={fluid} />;
                    })}
            </Wrapper>
        </Layout>
    );
};

export default Post;

Post.propTypes = {
    data: PropTypes.object.isRequired,
};
