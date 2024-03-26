"use client";
import styled from "styled-components";

export const Container = styled.main`
     display: flex;
    flex-direction: column;
    flex:1;
    width: 100%;
    gap:20px;
`;

export const BreadCrumbsContainer = styled.div`
    color: ${props => props.theme.colors.secondary};
`;