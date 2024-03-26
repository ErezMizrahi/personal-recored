"use client"
import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
flex-direction: row;
height: 100vh;
flex:1;
background-color: ${props => props.theme.colors.background};
color: ${props => props.theme.colors.secondary}
`;