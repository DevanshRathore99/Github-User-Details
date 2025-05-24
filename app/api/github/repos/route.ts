import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('user');

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  const data = await res.json();
  return NextResponse.json(data);
}
