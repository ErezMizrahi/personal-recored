"use client"
import styled from "styled-components";

export const MainContainer = styled.div<{loggedIn: boolean}>`
display: grid;
grid-template-columns: ${({ loggedIn }) => loggedIn ? 'auto 1fr' : 'auto'};
height: 100vh;
overflow: hidden;
gap: ${props => props.theme.dimenssions.verticalPadding}px;
padding: ${props => props.theme.dimenssions.verticalPadding}px ${props => props.theme.dimenssions.horizontalPadding}px;
background-color: ${props => props.theme.colors.light};
color: ${props => props.theme.colors.primary};
`;