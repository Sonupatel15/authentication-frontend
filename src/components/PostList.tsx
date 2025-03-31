// src/components/PostList.tsx
"use client"; // Needed if it were to have its own state/effects, but here it's just receiving props

import React from "react";
import { Post } from "@/types"; // Using default import alias '@'

interface PostListProps {
  posts: Post[];
  authCodeProvided: boolean; // Indicate if auth code exists to attempt fetch
  isLoading: boolean;
  error: string | null;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  authCodeProvided,
  isLoading,
  error,
}) => {
  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Existing Posts
      </h2>
      {!authCodeProvided && !isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Please enter an Auth Code above to view posts.
        </p>
      ) : isLoading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading posts...
        </p>
      ) : error ? (
        <div className="p-3 text-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          Error fetching posts: {error}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No posts found.
        </p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li
              key={index}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {post.body}
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Auth Header Used:{" "}
                <span className="font-mono bg-gray-200 dark:bg-gray-600 px-1 rounded">
                  {post.pinggyAuthHeader}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
