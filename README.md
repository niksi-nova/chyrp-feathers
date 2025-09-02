# Chyrp Feathers Ported to Supabase + FastAPI + Next.js

This project ports the **Feathers** concept from [Chyrp Lite](https://github.com/xenocrat/chyrp-lite) into a modern stack using:

- **Supabase** for database and file storage
- **FastAPI** as the backend service layer
- **Next.js (App Router)** as the frontend for testing and interaction

---

## What are Feathers in Chyrp?

In Chyrp Lite, *Feathers* are content types (similar to custom post types).  
Each feather defines the fields, upload handling, and display logic for a specific type of content.  
Examples include:
- **Audio**: audio files with captions
- **Video**: video uploads with optional poster and captions
- **Photo**: single photo with caption and alternative text
- **Link**: external link with description
- **Quote**: quoted text with optional source
- **Text**: plain text or formatted posts
- **Uploader**: multiple files grouped into a single post

---

## Architecture

- **Supabase**  
  - Database table `posts` holds metadata about all feathers.  
  - Storage bucket `uploads` holds actual media files (audio, video, images, documents).  

- **FastAPI Backend**  
  - Provides REST API endpoints for each feather type.  
  - Handles file uploads and stores metadata in Supabase.  
  - Implements validation and content-type checks.

- **Next.js Frontend**  
  - Each feather has a simple form-based interface for testing.  
  - Pages are located under `src/app/posts/[feather]/new/page.tsx`.  
  - Submissions are sent to the FastAPI backend via fetch requests.

---

## Features Implemented

- **Audio Feather**  
  Upload audio files with optional captions and description.

- **Video Feather**  
  Upload video files with optional poster image, captions, and description.

- **Photo Feather**  
  Upload an image with caption, alt text, and source URL.

- **Link Feather**  
  Submit external URLs with optional description and title.

- **Quote Feather**  
  Submit quoted text with optional source.

- **Text Feather**  
  Submit plain text with optional title.

- **Uploader Feather**  
  Upload multiple files (any type) with optional title and caption.

---

## Running the Project

1. **Backend (FastAPI)**  
   ```bash
   cd chyrp-feathers-backend
   python -m venv venv
   ./venv/Scripts/activate   # Windows
   pip install -r requirements.txt
   uvicorn main:app --reload


2. **Frontend for Testing (Next.js)**
   ```bash
   cd chyrp-feathers
   npm install
   npm run dev


3. **Access**

API available at http://127.0.0.1:8000

Frontend available at http://localhost:3000


**Database Schema (Supabase)**

The posts table includes:

id uuid primary key default gen_random_uuid(),
type text not null,          -- "audio", "video", "photo", etc.
title text,
description text,
content text,
created_at timestamp default now(),
audio_file text,
captions_file text,
video_file text,
poster_image text,
photo_file text,
caption text,
alt_text text,
source text,
files jsonb                  -- for uploader feather (array of file paths)
