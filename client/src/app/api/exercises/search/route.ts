import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest,response:NextApiResponse) {


const body = await request.json()

const url = `http://exercises:4002/api/exercises/search/${body.by}?query=${body.query}&from=0`
const res = await fetch(url,{method:"GET"})
const  data = await res.json()
return NextResponse.json(data)
}