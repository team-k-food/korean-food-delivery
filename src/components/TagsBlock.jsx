import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TagsContainer = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    a {
        margin: 0 0.75rem 0.75rem 0;
        color: ${props => props.theme.colors.black.base};
        padding: 0.5rem 1rem;
        border-radius: 30px;
        border: solid 1px ${props => props.theme.colors.black.second};
        &:hover {
            border-color: ${props => props.theme.colors.black.base};
        }
    }
`;

const TagsBlock = ({ list, renderMoreButton }) => (
    <TagsContainer>
        {list &&
            list.map(tag => {
                const upperTag = tag.charAt(0).toUpperCase() + tag.slice(1);
                return (
                    <Link key={tag} to={`/tags/${tag}`}>
                        <span>{upperTag}</span>
                    </Link>
                );
            })}
        {renderMoreButton && renderMoreButton()}
    </TagsContainer>
);

export default TagsBlock;

TagsBlock.propTypes = {
    list: PropTypes.array,
    renderMoreButton: PropTypes.func,
};
