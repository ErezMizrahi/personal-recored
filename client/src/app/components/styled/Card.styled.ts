"use client";
import styled from "styled-components";

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
   

`;

interface CardProps {
    width?: number;
    height?: number;
}

export const Card = styled.div<CardProps>`
    padding: 20px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    gap: 10px;
    ${({width}) => width && `min-width: ${width}px;` }
    ${({height}) => height && `height: ${height}px;` }
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    * {
        color: ${props => props.theme.colors.primary};
    }

    p {
        text-align: right;
        font-size: 0.8em;
    }

    &:hover {
        background-color: ${props => props.theme.colors.dark};
        box-shadow: 0px 0px 10px 0px  ${props => props.theme.colors.primary};

        *{
            color: ${props => props.theme.colors.light};
        }
    }

`;