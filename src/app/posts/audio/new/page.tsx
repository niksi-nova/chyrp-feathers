"use client";

import { useState } from "react";

export default function NewAudioPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an audio file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/audio", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded:", data);
      alert("Audio post created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading post. Check console.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Audio Post</h1>

      <input
        type="text"
        placeholder="Title"
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
        accept=".mp3,.m4a,.mp4,.oga,.ogg,.webm,.mka"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
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
