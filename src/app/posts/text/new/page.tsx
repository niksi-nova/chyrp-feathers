"use client";

import { useState } from "react";

export default function NewTextPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/text", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded text post:", data);
      alert("Text post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating text post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Text Post</h1>

      <input
        type="text"
        placeholder="Title (optional)"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Body"
        className="border p-2 rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Text Post
      </button>
    </form>
  );
}
