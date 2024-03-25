"use client";
import styled from "styled-components";

export const SideMenuContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
height: 100vh;
padding: 2em 1em;
background-color: white;
border-right:1px solid ${props => props.theme.colors.primary};
`

interface SideMenuWidthProps {
    width: string;
}
export const SideMenuWidth = styled.div<SideMenuWidthProps>`
width: ${props => props.width};
transition-property: width;
transition-duration: 0.5s;
transition-timing-function: linear;
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
padding: 15px 0px 0px 35px;
list-style: none;
margin: 0;
vertical-align: middle;
color: ${props => props.theme.colors.primary};
&:hover {
    color: ${props => props.theme.colors.primaryHover};
  }
  cursor: pointer;
  min-height: 50px;
`