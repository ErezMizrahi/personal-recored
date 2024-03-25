"use client"
import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: 100vh;
width: 100vw;
background-color: white;
color: ${props => props.theme.colors.secondary}
`;