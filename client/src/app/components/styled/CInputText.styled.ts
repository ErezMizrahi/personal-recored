'use client';
import styled from "styled-components";


export const CinputText = styled.input`
background-color: white;
color: ${props => props.theme.colors.secondary};
padding: 8px 12px;
border-top-right-radius: 4px;
border-top-left-radius: 4px;
outline: none;
border: 1px solid ${props => props.theme.colors.greenPrimary};
color:${props => props.theme.colors.textColorPrimary};
width:100%;
font-size:16px;
&::placeholder {
    color: #B5D4A9;
}
`;