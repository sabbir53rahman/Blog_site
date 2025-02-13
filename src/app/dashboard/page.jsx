"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "@/redux/features/blog/blogSlice";

const Dashboard = () => {
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPendingBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs/pending");
        setPendingBlogs(response.data); // Update state with fetched data
      } catch (error) {
        setError("Failed to fetch pending blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
      setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm("Are you sure you want to approve this blog?")) {
     dispatch(updateBlog(id));
     setPendingBlogs(pendingBlogs.filter((blog) => blog._id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Blogs</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && pendingBlogs.length === 0 && <p>No pending blogs found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingBlogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.category}</p>
            <p className="mt-2">{blog.description}</p>
            <p className="text-sm text-gray-500">Date: {blog.date}</p>

            {blog.photo && (
              <Image src={blog.photo} alt="Blog" width={300} height={200} className="mt-2 w-full h-40 object-cover rounded-md" />
            )}

            <div className="flex gap-2 mt-4">
              {/* Edit Button */}
              <Link href={`/edit-blog/${blog._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </Link>
              {/* Approve Button */}
              <button
                onClick={() => handleApprove(blog._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              {/* Remove Button */}
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
