// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        return NextResponse.json({ message: 'Token verified', uid: decodedToken.uid });
    } catch (error) {
        console.error('Firebase token verification failed:', error);
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
