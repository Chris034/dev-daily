import { NextRequest, NextResponse } from 'hono';
import { verify } from 'jsonwebtoken';

const SECRET = process.env.CLERK_JWT_SECRET;

export const authMiddleware = async (req: NextRequest, res: NextResponse, next: () => void) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verify(token, SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
};