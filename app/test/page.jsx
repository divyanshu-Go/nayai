// components/Dashboard.js
'use client';

import { useUser } from '@/context/UserContext';
import { useArticles } from '@/context/ArticleContext';

export default function test() {
  const { user, userLoading, setUser, fetchUser } = useUser();
  const { articles, articlesLoading, fetchArticles } = useArticles();

//   console.log(articles)
//   console.log(user)

  if (userLoading || articlesLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={fetchUser}>Refresh User</button>

      <h2>Legal Articles</h2>
      <button onClick={fetchArticles}>Refresh Articles</button>

      <ul>
        {articles.map((article) => (
          <li key={article._id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}
