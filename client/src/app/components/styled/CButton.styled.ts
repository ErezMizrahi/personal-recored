'use client';
import styled from "styled-components";

export const CButton = styled.button`
background-color: ${props => props.theme.colors.primary};
color: ${props => props.theme.colors.light};
padding: 8px 12px;
border-radius: 14px;
outline: none;
border: none;
cursor: pointer;
`;