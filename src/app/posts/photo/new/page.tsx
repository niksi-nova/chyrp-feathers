"use client";

import { useState } from "react";

export default function NewPhotoPost() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [altText, setAltText] = useState("");
  const [source, setSource] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);
    formData.append("alt_text", altText);
    formData.append("source", source);
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/photo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded photo:", data);
      alert("Photo post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating photo post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Photo Post</h1>

      <input
        type="text"
        placeholder="Title (optional)"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Caption (optional)"
        className="border p-2 rounded"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input
        type="text"
        placeholder="Alternative text (for accessibility)"
        className="border p-2 rounded"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
      />

      <input
        type="url"
        placeholder="Source URL (optional)"
        className="border p-2 rounded"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Photo
      </button>
    </form>
  );
}
