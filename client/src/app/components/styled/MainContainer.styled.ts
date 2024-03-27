"use client"
import styled from "styled-components";

export const MainContainer = styled.div<{$loggedin: boolean}>`
display: grid;
grid-template-columns: ${({ $loggedin }) => $loggedin ? '150px 1fr' : 'auto'};
height: 100vh;
overflow: hidden;
gap: ${props => props.theme.dimenssions.verticalPadding}px;
padding: ${props => props.theme.dimenssions.verticalPadding}px ${props => props.theme.dimenssions.horizontalPadding}px;
background-color: ${props => props.theme.colors.light};
color: ${props => props.theme.colors.primary};
`;