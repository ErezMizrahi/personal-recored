"use client";
import styled from "styled-components";

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
   

`;

interface CardProps {
    width: number;
    height: number;
}

export const Card = styled.div<CardProps>`
    padding: 20px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    gap: 10px;
    min-width: ${props => props.width}px;
    height: ${props => props.height}px;
`;