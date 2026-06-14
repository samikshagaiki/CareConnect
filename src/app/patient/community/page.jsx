"use client";

import { useEffect, useState } from "react";

export default function CommunityPage() {

  const [currentUserId, setCurrentUserId] =
  useState(null);

const [comments, setComments] =
  useState({});

const [commentInputs, setCommentInputs] =
  useState({});


  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [posts, setPosts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  async function fetchPosts() {
    try {
      const response =
        await fetch("/api/community");

      const data =
        await response.json();

      if (data.success) {
  setPosts(data.posts);

  setCurrentUserId(
    data.currentUserId
  );
}
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/community",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title,
              content,
            }),
          }
        );

      const data =
        await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTitle("");
      setContent("");

      await fetchPosts();

      alert(
        "Post created successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(
  postId
) {
  try {
    await fetch(
      "/api/community/like",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          postId,
        }),
      }
    );

    fetchPosts();
  } catch (error) {
    console.error(error);
  }
}

async function fetchComments(
  postId
) {
  try {
    if (comments[postId]) {
      setComments((prev) => {
        const updated = {
          ...prev,
        };

        delete updated[postId];

        return updated;
      });

      return;
    }

    const response =
      await fetch(
        `/api/community/comment?postId=${postId}`
      );

    const data =
      await response.json();

    if (data.success) {
      setComments(
        (prev) => ({
          ...prev,

          [postId]:
            data.comments,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }
}

async function addComment(
  postId
) {
  const content =
    commentInputs[postId];

  if (!content?.trim()) {
    return;
  }

  try {
    await fetch(
      "/api/community/comment",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          postId,
          content,
        }),
      }
    );

    setCommentInputs(
      (prev) => ({
        ...prev,

        [postId]: "",
      })
    );

    await fetchComments(
      postId
    );

    fetchPosts();
  } catch (error) {
    console.error(error);
  }
}

async function deletePost(
  postId
) {
  const confirmed =
    confirm(
      "Delete this post?"
    );

  if (!confirmed) {
    return;
  }

  try {
    await fetch(
      `/api/community/${postId}`,
      {
        method: "DELETE",
      }
    );

    fetchPosts();
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Community
      </h1>

      <p className="mt-2 text-muted-foreground">
        Share experiences, seek
        support, and learn from
        others.
      </p>

      <div className="mt-8 rounded-3xl border bg-card p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Create Post
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <textarea
            rows={5}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            className="w-full rounded-xl border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary px-6 py-3 text-primary-foreground"
          >
            {loading
              ? "Posting..."
              : "Create Post"}
          </button>
        </form>

      </div>

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Community Feed
        </h2>

        <div className="space-y-5">

          {posts.map((post) => (
            <div
              key={post._id}
              className="rounded-3xl border bg-card p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold">
                    {post.authorName}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>

                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(
                    post.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <h3 className="mt-4 text-xl font-semibold">
                {post.title}
              </h3>

              <p className="mt-3 whitespace-pre-wrap">
                {post.content}
              </p>

              <div className="mt-4 flex gap-4">

  <button
    onClick={() =>
      handleLike(post._id)
    }
    className="rounded-lg border px-3 py-1"
  >
    ❤️ {
      post.likes?.length || 0
    }
  </button>

  <button
    onClick={() =>
      fetchComments(
        post._id
      )
    }
    className="rounded-lg border px-3 py-1"
  >
    💬 {
      comments[post._id]
        ? "Hide"
        : "View"
    } Comments (
    {
      post.commentsCount ||
      0
    }
    )
  </button>

  {String(post.authorId) ===
  currentUserId && (
    <button
      onClick={() =>
        deletePost(
          post._id
        )
      }
      className="rounded-lg border px-3 py-1"
    >
      🗑 Delete
    </button>
  )}

</div>

{comments[post._id] && (
  <div className="mt-5 border-t pt-4">

    <h4 className="mb-3 font-semibold">
      Comments
    </h4>

    <div className="space-y-3">

      {comments[
        post._id
      ].map(
        (comment) => (
          <div
            key={
              comment._id
            }
            className="rounded-xl border p-3"
          >
            <p className="font-semibold">
              {
                comment.authorName
              }
            </p>

            <p>
              {
                comment.content
              }
            </p>
          </div>
        )
      )}

    </div>

    <div className="mt-4 flex gap-2">

      <input
        type="text"
        placeholder="Write a comment..."
        value={
          commentInputs[
            post._id
          ] || ""
        }
        onChange={(e) =>
          setCommentInputs(
            (prev) => ({
              ...prev,

              [post._id]:
                e.target
                  .value,
            })
          )
        }
        className="flex-1 rounded-xl border p-2"
      />

      <button
        onClick={() =>
          addComment(
            post._id
          )
        }
        className="rounded-xl border px-4"
      >
        Post
      </button>

    </div>

  </div>
)}

            </div>
          ))}

          

        </div>

      </div>
    </div>
  );
}