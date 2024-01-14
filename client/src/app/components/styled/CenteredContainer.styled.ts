'use client';
import styled from "styled-components";

export const CenteredContainer = styled.div`
 display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`;

export const CenteredDiv = styled.div`
background-color: var(--color-light);
border-radius: 10px;
padding: 4rem;
width: 30rem;
position: relative;
`;


export const CenteredImage = styled.div`
position: absolute;
top: -4em;
right: 0;
left: 0;
display: flex;
justify-content: center;
`;