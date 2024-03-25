import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

type ResponseData = {
    message: string
}

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    return NextResponse.json(session?.user.idToken)
}