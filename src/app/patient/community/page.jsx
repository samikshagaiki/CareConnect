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
  <div className="space-y-8">

    {/* HEADER */}

    <div
      className="
      rounded-[40px]
      bg-gradient-to-r
      from-[#8EC5FC]
      to-[#DCCCFD]
      p-10
      text-white
      shadow-xl
    "
    >
      <h1 className="text-5xl font-bold">
        Community Hub 💜
      </h1>

      <p className="mt-3 text-lg text-white/90">
        Share experiences, seek support and grow together.
      </p>
    </div>

    <div className="grid xl:grid-cols-[1fr_320px] gap-8">

      {/* LEFT SECTION */}

      <div className="space-y-8">

        {/* CREATE POST */}

        <div
          className="
          rounded-[32px]
          bg-white
          p-8
          shadow-lg
          border border-purple-100
        "
        >
          <h2 className="text-2xl font-bold text-slate-800">
            Create A Post ✨
          </h2>

          <p className="mt-2 text-slate-500">
            Share what's on your mind today.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >

            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              className="
                w-full
                rounded-2xl
                border
                border-purple-100
                bg-[#FAFCFF]
                px-5
                py-4
                outline-none
                focus:ring-4
                focus:ring-purple-100
              "
            />

            <textarea
              rows={5}
              placeholder="What's on your mind today?"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              required
              className="
                w-full
                rounded-2xl
                border
                border-purple-100
                bg-[#FAFCFF]
                p-5
                outline-none
                resize-none
                focus:ring-4
                focus:ring-purple-100
              "
            />

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-2xl
                bg-gradient-to-r
                from-[#8EC5FC]
                to-[#DCCCFD]
                px-8
                py-4
                font-semibold
                text-white
                shadow-md
              "
            >
              {loading
                ? "Posting..."
                : "Share Post"}
            </button>

          </form>

        </div>

        {/* POSTS */}

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post._id}
              className="
              rounded-[32px]
              bg-white
              p-7
              shadow-lg
              border
              border-purple-100
            "
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className="
                    h-12
                    w-12
                    rounded-full
                    bg-gradient-to-r
                    from-[#8EC5FC]
                    to-[#DCCCFD]
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                  "
                  >
                    {post.authorName?.charAt(0)}
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      {post.authorName}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {post.authorRole}
                    </p>

                  </div>

                </div>

                <p className="text-sm text-slate-400">
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

              <h3 className="mt-5 text-2xl font-bold">
                {post.title}
              </h3>

              <p className="mt-4 whitespace-pre-wrap text-slate-600 leading-relaxed">
                {post.content}
              </p>

              {/* ACTIONS */}

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    handleLike(post._id)
                  }
                  className="
                  rounded-full
                  bg-pink-50
                  px-4
                  py-2
                  text-pink-500
                "
                >
                  ❤️ {post.likes?.length || 0}
                </button>

                <button
                  onClick={() =>
                    fetchComments(post._id)
                  }
                  className="
                  rounded-full
                  bg-sky-50
                  px-4
                  py-2
                  text-sky-600
                "
                >
                  💬 {post.commentsCount || 0}
                </button>

                {String(post.authorId) ===
                  currentUserId && (
                  <button
                    onClick={() =>
                      deletePost(post._id)
                    }
                    className="
                    rounded-full
                    bg-red-50
                    px-4
                    py-2
                    text-red-500
                  "
                  >
                    Delete
                  </button>
                )}

              </div>

              {/* COMMENTS */}

              {comments[post._id] && (

                <div className="mt-6 border-t border-purple-100 pt-5">

                  <div className="space-y-3">

                    {comments[
                      post._id
                    ].map((comment) => (

                      <div
                        key={comment._id}
                        className="
                        rounded-2xl
                        bg-[#FAFCFF]
                        p-4
                      "
                      >

                        <p className="font-semibold">
                          {comment.authorName}
                        </p>

                        <p className="mt-2 text-slate-600">
                          {comment.content}
                        </p>

                      </div>

                    ))}

                  </div>

                  <div className="mt-4 flex gap-3">

                    <input
                      type="text"
                      placeholder="Write a supportive comment..."
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
                              e.target.value,
                          })
                        )
                      }
                      className="
                        flex-1
                        rounded-2xl
                        border
                        border-purple-100
                        px-4
                        py-3
                      "
                    />

                    <button
                      onClick={() =>
                        addComment(
                          post._id
                        )
                      }
                      className="
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#8EC5FC]
                      to-[#DCCCFD]
                      px-5
                      text-white
                    "
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

      {/* RIGHT SIDEBAR */}

      <div className="space-y-6">

        <div className="rounded-[32px] bg-white p-6 shadow-lg">
          <h3 className="font-bold text-xl">
            🌱 Wellness Tip
          </h3>

          <p className="mt-3 text-slate-600">
            Progress is not about perfection.
            Small daily improvements matter.
          </p>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-lg">
          <h3 className="font-bold text-xl">
            💜 Community Stats
          </h3>

          <div className="mt-5 space-y-3">

            <div className="flex justify-between">
              <span>Posts</span>
              <span>{posts.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Members</span>
              <span>Growing</span>
            </div>

          </div>
        </div>

        <div
          className="
          rounded-[32px]
          bg-gradient-to-r
          from-[#8EC5FC]
          to-[#DCCCFD]
          p-6
          text-white
          shadow-lg
        "
        >
          <h3 className="text-xl font-bold">
            ✨ Daily Reminder
          </h3>

          <p className="mt-3">
            You are stronger than you think,
            and you don't have to face things alone.
          </p>
        </div>

      </div>

    </div>

  </div>
);
}