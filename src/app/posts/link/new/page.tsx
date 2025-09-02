"use client";

import { useState } from "react";

export default function NewLinkPost() {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("source", source);
    formData.append("description", description);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/link", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded link:", data);
      alert("Link post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating link post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Link Post</h1>

      <input
        type="text"
        placeholder="Title (optional)"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="url"
        placeholder="URL"
        className="border p-2 rounded"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
}
