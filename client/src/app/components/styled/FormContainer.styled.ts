"use client";
import styled from "styled-components";

export const FormContainer = styled.div`
    background-color: ${props => props.theme.colors.dark};
    border-radius: 10px;
    padding: 4rem;
    width: 30rem;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    color:  ${props => props.theme.colors.light};
    width: 100%;

    //style for the label
    input {
        color:  ${props => props.theme.colors.dark};
    }

    button {
        margin: auto;
    }
`;

export const FormInput = styled.input`
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.light};
    padding: 0.55em;
    border-radius: 5px;
    border: none;
`;