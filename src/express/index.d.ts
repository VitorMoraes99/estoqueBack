import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      userId?: number; // ou string, dependendo do tipo do ID do usuário
    }
  }
}
