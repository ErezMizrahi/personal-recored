'use client';
import styled from "styled-components";

export const CButton = styled.button`
background-color: white;
color: ${props => props.theme.colors.secondary};
padding: 8px 12px;
border-radius: 14px;
outline: none;
border: 1px solid ${props => props.theme.colors.primary};
cursor: pointer;
color:${props => props.theme.colors.primary};
`;