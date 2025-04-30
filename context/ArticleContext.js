// context/ArticleContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/article');
      const data = await res.json();

      if (res.ok) setArticles(data);

    } catch (err) {
      console.error('Failed to fetch articles:', err);
    } finally {
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticleContext.Provider value={{ articles, setArticles, fetchArticles, articlesLoading }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => useContext(ArticleContext);
