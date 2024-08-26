// types/next.d.ts

import { NextApiRequest } from 'next';
import { JwtPayload } from 'jsonwebtoken'; // Assuming you use JwtPayload for the decoded token

declare module 'next' {
  interface NextApiRequest {
    user?: JwtPayload;
  }
}
