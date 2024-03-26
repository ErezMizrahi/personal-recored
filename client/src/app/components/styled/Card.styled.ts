"use client";
import styled from "styled-components";

export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;
export const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    gap: 10px;
`;