// src/app/page.tsx
"use client"; // Required because we use hooks (useState, useEffect, useCallback)

import React, { useState, useEffect, useCallback } from "react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import { Post } from "@/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authCode, setAuthCode] = useState<string>(""); // Shared auth code state
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [listError, setListError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Function to fetch posts, wrapped in useCallback for stability if needed elsewhere
  const fetchPosts = useCallback(async () => {
    // Don't attempt fetch if auth code is missing
    if (!authCode.trim()) {
      setPosts([]); // Clear posts if auth code is removed
      setListError(null); // Clear previous errors
      setIsListLoading(false);
      // Optionally set a specific message like "Auth Code required"
      // setListError("Auth Code required to fetch posts.");
      return;
    }

    setIsListLoading(true);
    setListError(null);

    try {
      const response = await fetch(`${apiUrl}/list`, {
        method: "GET",
        headers: {
          PinggyAuthHeader: authCode, // Use the shared auth code
        },
      });

      if (!response.ok) {
        let errorMsg = `Failed to fetch posts: ${response.status}`;
        if (response.status === 401) {
          errorMsg = "Unauthorized: Check your Auth Code.";
        } else {
          try {
            const errorText = await response.text();
            if (errorText) errorMsg += ` - ${errorText}`;
          } catch (e) {
            /* ignore */
          }
        }
        throw new Error(errorMsg);
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]); // Clear posts on error
      setListError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred fetching posts."
      );
    } finally {
      setIsListLoading(false);
    }
  }, [authCode, apiUrl]); // Dependency: refetch if authCode or apiUrl changes

  // Fetch posts when the component mounts or when authCode changes
  // We use a separate trigger function for post-submission refresh
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // fetchPosts dependency includes authCode

  // Callback function for PostForm to trigger a refresh after successful submission
  const handlePostSuccess = () => {
    console.log("Post successful, refreshing list...");
    fetchPosts(); // Re-fetch the list
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6 sm:p-12 md:p-24 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Post Management
        </h1>

        {/* Form Component */}
        <PostForm
          authCode={authCode}
          setAuthCode={setAuthCode}
          onPostSuccess={handlePostSuccess}
        />

        {/* List Component */}
        <PostList
          posts={posts}
          authCodeProvided={!!authCode.trim()} // Pass boolean indicating if auth code is present
          isLoading={isListLoading}
          error={listError}
        />
      </div>
    </main>
  );
}
