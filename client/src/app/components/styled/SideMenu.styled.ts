"use client";
import styled from "styled-components";

export const SideMenuContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
height: 100vh;
padding: 2em;
background-color: ${props => props.theme.colors.dark};
`

interface SideMenuWidthProps {
    width: number;
}
export const SideMenuWidth = styled.div<SideMenuWidthProps>`
width: ${props => props.width};
transition-property: width;
transition-duration: 4s;
transition-timing-function: linear;
transition-delay: 1s;
`

export const LinkListContainer = styled.ul`
list-style: none;
height: 100%;
width: 100%;
display: flex;
flex-direction: column;
gap: 10px;
margin-top: 2em;
`
interface ListItemWithImageProps {
    icon: string;
}

export const ListItemWithImage = styled.li<ListItemWithImageProps>`
background: url(${props => props.icon}) no-repeat left center;
padding: 5px 0px 5px 35px;
list-style: none;
margin: 0;
vertical-align: middle;
`