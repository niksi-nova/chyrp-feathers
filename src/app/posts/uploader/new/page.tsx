"use client";

import { useState } from "react";

export default function NewUploaderPost() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("caption", caption);

    // ✅ append multiple files under the same field name "files"
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("http://127.0.0.1:8000/posts/uploader", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);

      const data = await res.json();
      console.log("Uploaded files:", data);
      alert("Uploader post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating uploader post.");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="p-6 max-w-xl mx-auto flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">New Uploader Post</h1>

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
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload Files
      </button>
    </form>
  );
}
