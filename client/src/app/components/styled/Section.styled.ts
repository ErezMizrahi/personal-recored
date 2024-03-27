'use client';
import styled from "styled-components";

export const Headline = styled.h2`
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.secondary};
    text-underline-offset:8px;
    &::after {
        content: '..';
        color: transparent
    }
`;

export const SubHeadline = styled.h3`
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.secondary};
    text-underline-offset:8px;
    &::after {
        content: '..';
        color: transparent
    }
`;

