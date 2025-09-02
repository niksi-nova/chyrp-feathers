import { supabase } from "@/lib/supabaseClient";

export default async function AudioPostPage({ params }: { params: { id: string } }) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !post) {
    return <p>Post not found.</p>;
  }

  const audioUrl =
    supabase.storage.from("uploads").getPublicUrl(post.audio_file).data.publicUrl;

  const captionsUrl = post.captions_file
    ? supabase.storage.from("uploads").getPublicUrl(post.captions_file).data.publicUrl
    : null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4">{post.description}</p>
      <audio controls className="w-full">
        <source src={audioUrl} type="audio/mpeg" />
        {captionsUrl && <track kind="captions" src={captionsUrl} />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
