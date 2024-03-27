import { getStaticProps } from 'next/dist/build/templates/pages';
import React from 'react'

interface ProgramPageProps {
    params: {
        id: string;
    };
}

const ProgramPage = ({ params }: ProgramPageProps) => {
    return (
        <div>ProgramPage {params.id}</div>
    )
}


export default ProgramPage