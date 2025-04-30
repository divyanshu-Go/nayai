'use client';
import { useState } from 'react';
import { useArticles } from '@/context/ArticleContext';
import CategorySelector from '@/components/CategorySelector';
import ArticleSection from '@/components/ArticleSection';

export default function ArticlesPage() {
  const { articles, articlesLoading } = useArticles();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Legal Resources</h1>
      
      {articlesLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 b">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <CategorySelector 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-grow  b">
            <ArticleSection 
              articles={articles} 
              selectedCategory={selectedCategory} 
            />
          </div>
        </div>
      )}
    </div>
  );
}