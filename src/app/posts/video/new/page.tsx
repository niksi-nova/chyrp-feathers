"use client";

import { useState } from "react";

export default function NewVideoPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [captions, setCaptions] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    if (captions) formData.append("captions", captions);
    if (poster) formData.append("poster_image", poster);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/video", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded video:", data);
      alert("Video post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating video post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Video Post</h1>

      <input
        type="text"
        placeholder="Title (optional)"
        className="border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />

      <input
        type="file"
        accept=".vtt"
        onChange={(e) => setCaptions(e.target.files?.[0] || null)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPoster(e.target.files?.[0] || null)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}
