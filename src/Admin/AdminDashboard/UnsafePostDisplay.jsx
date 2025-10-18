import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiTag, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import { MdWarning, MdFlag } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchAllUnsafePosts, deletePost } from "../AdminService";

const UnsafePostsDisplay = () => {
    const { token } = useContext(StoreContext);
    const [unsafePosts, setUnsafePosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingPostId, setDeletingPostId] = useState("");
    const navigate = useNavigate();

    const fetchUnsafePosts = async () => {
        setLoading(true);
        try {
            // Replace with your actual API endpoint
            const response = await fetchAllUnsafePosts(token);
            const data = response;
            
            if (data && Array.isArray(data)) {
                setUnsafePosts(data);
            } else {
                console.warn("Unexpected data format:", data);
            }
        } catch (err) {
            console.error("Error fetching unsafe posts:", err);
            toast.error("Failed to load unsafe posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUnsafePosts(token);
    }, [token]);

     const handlePostClick = (postId) => {
            navigate(`/posts/${postId}`);
        };
    
       
    
        const handleDeletePost = async (postId) => {
            if (!window.confirm("Are you sure you want to delete this post?")) return;
    
            setDeletingPostId(postId);
            try {
                await deletePost(postId, token);
                
                toast.success("post deleted successfully..!");
            } catch (err) {
                console.error("Error deleting post:", err);
                alert("Failed to delete post. Please try again.");
                toast.error("error while deleting post. please try again..")
            } finally {
                setDeletingPostId(null);
                window.location.reload();
            }
        };

    const parseTags = (tagsString) => {
        if (!tagsString) return [];
        return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    };

    const parseKeywords = (keywordsString) => {
        if (!keywordsString) return [];
        return keywordsString.split(',').map(keyword => keyword.trim()).filter(Boolean);
    };

    const getSeverityColor = (reason) => {
        const lowerReason = reason?.toLowerCase() || '';
        if (lowerReason.includes('violence') || lowerReason.includes('harm')) {
            return 'from-red-500 to-red-700';
        } else if (lowerReason.includes('sexual') || lowerReason.includes('explicit')) {
            return 'from-purple-500 to-purple-700';
        } else if (lowerReason.includes('hate') || lowerReason.includes('discrimination')) {
            return 'from-orange-500 to-orange-700';
        }
        return 'from-yellow-500 to-yellow-700';
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 px-4 py-12">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back
                </button>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <FiAlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Flagged Content
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Posts identified as containing unsafe, harmful, or prohibited content
                    </p>
                    {!loading && unsafePosts.length > 0 && (
                        <div className="mt-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
                                <MdFlag className="w-5 h-5" />
                                {unsafePosts.length} Flagged {unsafePosts.length === 1 ? 'Post' : 'Posts'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Warning Banner */}
                <div className="mb-8 bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-start gap-4">
                        <MdWarning className="w-6 h-6 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-lg mb-2">Content Warning</h3>
                            <p className="text-red-50">
                                The posts below have been flagged by our moderation system. Exercise caution when reviewing this content.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                    </div>
                )}

                {/* Posts Grid */}
                <div className="space-y-6">
                    {unsafePosts.map((post) => (
                        <article
                            key={post.publicId}
                            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-4 border-red-500"
                        >
                            <div className="p-6 md:p-8">
                                {/* Header with Severity Indicator */}
                                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-full bg-gradient-to-br ${getSeverityColor(post.reason)}`}>
                                            <MdFlag className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-semibold text-gray-500">Post ID:</span>
                                                <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                                                    {post.publicId}
                                                </code>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <FiCalendar className="w-3.5 h-3.5" />
                                                Flagged on {new Date(post.flaggedAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {post.category}
                                    </span>
                                </div>

                                {/* Post Title */}
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">
                                    {post.title}
                                </h2>

                                {/* Moderation Reason */}
                                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                    <div className="flex items-start gap-3">
                                        <FiAlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-red-900 mb-1">Flagged Reason:</h4>
                                            <p className="text-red-800 text-sm">{post.reason}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Keywords */}
                                {post.keywords && parseKeywords(post.keywords).length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Detected Keywords:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {parseKeywords(post.keywords).map((keyword, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold border border-red-200"
                                                >
                                                    <MdWarning className="w-3 h-3" />
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {post.tags && parseTags(post.tags).length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Post Tags:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {parseTags(post.tags).slice(0, 6).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200"
                                                >
                                                    <FiTag className="w-3 h-3" />
                                                    {tag}
                                                </span>
                                            ))}
                                            {parseTags(post.tags).length > 6 && (
                                                <span className="inline-flex items-center bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    +{parseTags(post.tags).length - 6} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => handlePostClick(post.publicId)}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Review Full Post
                                    </button>
                                    <button
                                        onClick={() => handleDeletePost(post.publicId)}
                                        disabled={deletingPostId === post.publicId}
                                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed border-2 border-red-200 hover:border-red-300"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {deletingPostId === post.publicId ? "Deleting..." : "Delete Permanently"}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Empty State */}
                {!loading && unsafePosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No flagged content</h3>
                        <p className="text-gray-600">All posts are safe and within community guidelines!</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UnsafePostsDisplay;