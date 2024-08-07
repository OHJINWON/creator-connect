// pages/api/auth/naver/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // 네이버 로그아웃 처리 로직 (세션 제거 등)
  // 네이버 로그아웃 URL 호출 등 추가 로직 필요 시 작성

  console.log("성공")

  res.status(200).json({ message: "Logged out successfully" });
};
