'use client';
import styled from "styled-components";

export const CButton = styled.button`
background-color: white;
color: white;
padding:${props => props?.style?.padding ? props.style.padding:  "8px 12px"};
border-radius: 14px;
outline: none;
border: 1px solid ${props => props.theme.colors.primary};
cursor: pointer;
background-color:${props => props.theme.colors.secondary};
height:${props => props?.style?.height ? props.style.height : "auto"};
width:${props => props?.style?.width ? props.style.width : "auto"};
`;