'use client';

import ElasticSearch from '@/app/components/ui/ElasticSearch/ElasticSearch'
import React, { useState } from 'react'
import './index.css'
import Card from '@/app/components/ui/Card/Card';

const WorkoutProgramCreate = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, any>[]>([]);


  return (
    <>
     <ElasticSearch selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
     <div className='cards-container'>
      {selectedItems.map(item=>(
        <Card item={item} />
      ))}
     </div>
    </>
   
  )
}

export default WorkoutProgramCreate