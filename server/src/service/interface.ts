declare module 'express-session' {
  interface Session {
    username: string;
    useridx: number;
    jwt: string;
  }
}

export interface DBUser {
  idx: number;
  nickname: string;
  profile: string;
  cover: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}