import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest,response:NextApiResponse) {


const body = await request.json()
console.log(body.name)
const url = `http://exercises:4002/api/exercises//search?name=${body.name}&from=0&equipment=other`
const res = await fetch(url,{method:"GET"})

const  data = await res.json()
console.log(data)
return NextResponse.json(data.data)
}