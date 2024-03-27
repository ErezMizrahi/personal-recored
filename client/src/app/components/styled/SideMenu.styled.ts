"use client";
import styled from "styled-components";

export const SideMenuContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
height: calc(100vh - ${props => props.theme.dimenssions.verticalPadding * 2}px); ;
background-color: ${props => props.theme.colors.primary};
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border-radius:14px;
/* max-width: 150px; */
`
export const SideMenuWrapper = styled.div`
  /* position: sticky;
  top: 20px;
  box-sizing: border-box; */

`
export const SideMenuWidth = styled.div`
width: 100%;
transition-property: width;
transition-duration: 0.5s;
transition-timing-function: linear;
position:relative;
height:100%;
padding-top:40px;
display: flex;
flex-direction: column;
align-items: center;

`

export const LinkListContainer = styled.div`
list-style: none;
display: flex;
flex-direction: column;
gap: 10px;
margin-top: 2em;
width: 100%;
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