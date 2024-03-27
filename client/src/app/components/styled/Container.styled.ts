"use client";
import styled from "styled-components";

export const Container = styled.main`
display: grid;
grid-template-rows: auto 1fr;
gap: 20px;
overflow: hidden;
`;

export const BreadCrumbsContainer = styled.div`
    color: ${props => props.theme.colors.secondary};
`;