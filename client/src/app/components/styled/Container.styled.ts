"use client";
import styled from "styled-components";

export const Container = styled.main`
display: grid;
grid-template-rows: auto 1fr;
gap: 20px;
overflow: hidden;
`;

export const BreadCrumbsContainer = styled.div`
    color: ${props => props.theme.colors.secondary};
`;

export const DashboardContainer = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas: 
        "c1 c2 c3"
        "c4 c4 c5"
        "c4 c4 c6";

    :nth-child(1) { grid-area: c1; border-radius: 5px }
    :nth-child(2) { grid-area: c2; border-radius: 5px }
    :nth-child(3) { grid-area: c3; border-radius: 5px }
    :nth-child(4) { grid-area: c4; border-radius: 5px }
    :nth-child(5) { grid-area: c5; border-radius: 5px }
    :nth-child(6) { grid-area: c6; border-radius: 5px }
`;

export const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 30px;
    align-items: baseline;

    > p {
        color: ${props => props.theme.colors.primary};
    }
`