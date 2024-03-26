"use client"
import styled from "styled-components";

export const MainContainer = styled.div`
display: flex;
flex-direction: row;
height: 100vh;
flex:1;
padding: 20px 10px;
background-color: ${props => props.theme.colors.light};
color: ${props => props.theme.colors.primary};
`;