// src/components/PostForm.tsx
"use client"; // Required for components with hooks and event handlers

import React, { useState, FormEvent } from "react";

interface PostFormProps {
  authCode: string;
  setAuthCode: (code: string) => void;
  onPostSuccess: () => void; // Callback to trigger list refresh
}

const PostForm: React.FC<PostFormProps> = ({
  authCode,
  setAuthCode,
  onPostSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null); // Clear previous errors

    if (!title.trim() || !body.trim() || !authCode.trim()) {
      setFormError("Title, Body, and Auth Code cannot be empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          PinggyAuthHeader: authCode,
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) {
        // Try to get specific error message from backend if available
        let errorMsg = `Submission failed with status: ${response.status}`;
        try {
          if (response.status === 401) {
            errorMsg = "Unauthorized: Check your Auth Code.";
          } else if (response.status === 400) {
            const errorData = await response.json();
            // Assuming backend sends { "field": "message" } on validation error
            errorMsg = `Bad Request: ${Object.values(errorData).join(", ")}`;
          } else {
            const errorText = await response.text();
            if (errorText) errorMsg += ` - ${errorText}`;
          }
        } catch (e) {
          /* Ignore parsing errors */
        }
        throw new Error(errorMsg);
      }

      // Success
      console.log("Post submitted successfully");
      setTitle(""); // Clear form fields
      setBody("");
      // Optionally clear authCode too, or keep it for subsequent requests
      // setAuthCode('');
      onPostSuccess(); // Trigger list refresh in parent component
    } catch (error) {
      console.error("Submission error:", error);
      setFormError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred during submission."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Create New Post
      </h2>
      {formError && (
        <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
          {formError}
        </div>
      )}
      <div>
        <label
          htmlFor="authCode"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Auth Code (Header)
        </label>
        <input
          id="authCode"
          type="text" // Use password if you want to obscure it
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Required for submitting and viewing posts.
        </p>
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Body
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Post"}
      </button>
    </form>
  );
};

export default PostForm;
