"use client";

export default function SocietyPostList({ posts }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Posts</h3>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="p-4 mb-4 dark:bg-gray-800 rounded-lg">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-200"
            />
            {post.image && (
              <img
                alt="Uploaded content"
                className="mt-4 rounded-lg max-h-64"
                src={post.image}
              />
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  );
}
