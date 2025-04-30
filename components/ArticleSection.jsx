import ArticleCard from './ArticleCard';

export default function ArticleSection({ articles, selectedCategory }) {
  const filteredArticles = selectedCategory === 'All Categories'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="w-full ">
      <div className="mb-6 ">
        <h2 className="text-2xl font-semibold text-gray-800">
          {selectedCategory}
        </h2>
        <p className="text-gray-600 ">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="space-y-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}