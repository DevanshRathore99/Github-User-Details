import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    // console.log('searchParams', searchParams);
    const username = searchParams.get('user');
    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            'User-Agent': 'github-user-details-app'
        },
    });
    // console.log('res', res);
    const data = await res.json();
    // console.log('data', data);

    if (!res.ok) {
        return NextResponse.json({ error: res.statusText }, { status: res.status });
    }

    return NextResponse.json(data);
}
