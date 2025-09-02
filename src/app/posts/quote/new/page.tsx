"use client";

import { useState } from "react";

export default function NewQuotePost() {
  const [quote, setQuote] = useState("");
  const [source, setSource] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("quote", quote);
    formData.append("source", source);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/quote", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded quote:", data);
      alert("Quote post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating quote post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Quote Post</h1>

      <textarea
        placeholder="Enter a quote..."
        className="border p-2 rounded"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Source (optional)"
        className="border p-2 rounded"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Quote
      </button>
    </form>
  );
}
