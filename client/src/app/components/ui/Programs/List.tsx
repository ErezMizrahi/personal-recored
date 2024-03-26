import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import nextFetch from '@/app/api/next-fetch';
import { get } from 'http';
import { getServerSession } from 'next-auth';
import React from 'react'
import { Card, CardContainer } from '../../styled/Card.styled';

interface ListProps {
    array: any[];
}

const List = async ({ array } : ListProps) => {
   

  return (
    <CardContainer>
        {array.map((item, index) => (
            <Card key={index}>
                <h3>{item.name}</h3>
                <p>{item.endDate}</p>
            </Card>
        ) 
    )}
    </CardContainer>
  )
}

export default List