import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Wrapper = styled.header`
    margin: 5rem 0 2rem 0;
    padding: 4rem 0 1rem 0;
    @media (min-width: ${props => props.theme.breakpoints.m}) {
        padding: 8rem 0 4rem 0;
    }
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: middle;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
`;

const Title = styled.h1`
    margin: 4rem auto 0;
    line-height: 1.5;
    max-width: 330px;
    color: ${props => props.theme.colors.black.light};
    font-size: 0.8rem;
    @media (min-width: ${props => props.theme.breakpoints.m}) {
        margin: 6rem auto 0;
    }
    a:not(.gatsby-resp-image-link):not(.anchor) {
        color: ${props => props.theme.colors.link.base};
        &:hover,
        &:focus {
            border-bottom: solid 1px ${props => props.theme.colors.link.base};
        }
    }
`;

const CoverWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = ({ title, cover, showTitle = true }) => (
    <Wrapper>
        {cover && (
            <CoverWrapper>
                <Img fixed={cover} />
            </CoverWrapper>
        )}
        <Text>
            {showTitle &&
                (title || (
                    <Title>
                        여기저기 흩어져있는 배달 가능한 한국 식당들을 모두
                        모았습니다.{' '}
                        <Link to="/about">
                            정보에 오류가 있거나 변경된 부분이 있으면 알려주세요
                        </Link>
                    </Title>
                ))}
        </Text>
    </Wrapper>
);

export default Header;

Header.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
    ]),
    showTitle: PropTypes.bool,
};

Header.defaultProps = {
    children: false,
    cover: false,
    title: false,
};
