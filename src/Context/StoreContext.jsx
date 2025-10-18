import { createContext, useState, useEffect, useCallback } from "react";
import { fetchAllPosts } from "../service/PostService";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {

  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [userName, setUserName] = useState(sessionStorage.getItem("userName") || "");
  const [publicId, setPublicId] = useState(sessionStorage.getItem("publicId") || "");
  const [role , setRole] = useState(sessionStorage.getItem("role") || "" );


  const [postsByPage, setPostsByPage] = useState({}); // {1: [...], 2: [...]}

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);

  // Wrap storePosts in useCallback so it's stable
  const storePosts = useCallback((page, posts, totalPagesCount) => {
    setPostsByPage((prev) => ({ ...prev, [page]: posts }));
    setTotalPages(totalPagesCount);
  }, []);

  // Fetch first page immediately
  const fetchInitialPosts = useCallback(async () => {
    
    if (postsByPage[1]) return; // already fetched

    setLoading(true);
    try {
      const data = await fetchAllPosts(0, 10); // page=0, size=10
      storePosts(1, data.content, data.totalPages);
    } catch (error) {
      console.error("Error fetching initial posts:", error);
    } finally {
      setLoading(false);
    }
  }, [postsByPage, storePosts]);

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(""); // triggers re-render everywhere
  };

  const contextValue = {
    token,
    setToken,
    publicId,
    setPublicId,
    userName,
    setUserName,
    logout,
    postsByPage,
    storePosts,
    totalPages,
    loading,
    role,
    setRole
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
