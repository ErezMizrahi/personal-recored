import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server'
import nextFetch from '../../next-fetch';
 
export async function POST(request: NextApiRequest,response:NextApiResponse) {
    const body = await request.body();
    console.log(body.name)

     const res = await nextFetch({
           service: 'exercises',
           route: `/api/exercises/search?name=${body.name}&from=0&equipment=other`,
           method: 'get',
           headersMap: { }
    });

    if(res.ok) {
        const  data = await res.json()
        console.log(data)
        return NextResponse.json(data.data)
    }

    return NextResponse.json({error: 'error'});
}