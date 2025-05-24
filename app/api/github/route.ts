import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('user');
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    if (!res.ok) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(data);
}
