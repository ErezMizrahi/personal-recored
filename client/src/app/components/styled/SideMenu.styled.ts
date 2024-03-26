"use client";
import styled from "styled-components";

export const SideMenuContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
height: 100%;
background-color: ${props => props.theme.colors.primary};
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border-radius:14px;

`
export const SideMenuWrapper = styled.div`
padding:20px 10px 20px 10px;
height:100vh;
position:fixed;


`
interface SideMenuWidthProps {
    width: string;
}
export const SideMenuWidth = styled.div<SideMenuWidthProps>`
width: ${props => props.width};
transition-property: width;
transition-duration: 0.5s;
transition-timing-function: linear;
position:relative;
height:100%;
padding-top:40px;

`

export const LinkListContainer = styled.div`
list-style: none;
display: flex;
flex-direction: column;
gap: 10px;
margin-top: 2em;
`


export const ListItem = styled.div`
padding: 15px 0px 0px 20px;
list-style: none;
vertical-align: middle;
white-space:nowrap;
color: white;
font-size:16px;
&:hover {

    text-decoration: underline;
    text-decoration-color: ${props => props.theme.colors.secondary};
    text-underline-offset:10px;
   
  }
  cursor: pointer;
  min-height: 50px;
`

export const listItemText = styled.div``