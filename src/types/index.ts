// src/types/index.ts
export interface Post {
    title: string;
    body: string;
    pinggyAuthHeader: string; // Matches the backend DTO field name
  }