// src/components/PostDisplay.jsx
import React, { useState } from "react";

const recentPosts = [
  { id: 1, title: "Understanding React Hooks", date: "Oct 1, 2025" },
  { id: 2, title: "JavaScript ES2025 Features", date: "Sep 28, 2025" },
  { id: 3, title: "Tailwind CSS Tips", date: "Sep 25, 2025" },
];

const popularPosts = [
  { id: 1, title: "10 Best VSCode Extensions", date: "Aug 20, 2025" },
  { id: 2, title: "Frontend Performance Tips", date: "Jul 15, 2025" },
  { id: 3, title: "React vs Vue in 2025", date: "Jun 30, 2025" },
];

const blogs = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Blog Post #${i + 1}`,
  excerpt: "This is a short description of the blog post...",
  date: `Oct ${i + 1}, 2025`,
}));

const PostDisplay = () => {
  const [selectedCategory, setSelectedCategory] = useState("recent"); // 'recent' or 'popular'

  const postsToDisplay =
    selectedCategory === "recent" ? recentPosts : popularPosts;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-md font-semibold transition ${
            selectedCategory === "recent"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("recent")}
        >
          Recent Posts
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold transition ${
            selectedCategory === "popular"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("popular")}
        >
          Most Popular Posts
        </button>
      </div>

      {/* Selected Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {postsToDisplay.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        ))}
      </div>

      {/* Blog List (static 10 blogs for now) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition cursor-pointer"
          >
            <h3 className="text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
            <p className="text-gray-400 text-xs">{blog.date}</p>
          </div>
        ))}
      </div>

      {/* Next / Explore More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default PostDisplay;
