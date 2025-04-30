import Link from 'next/link';

export default function ArticleCard({ article }) {
  return (
    <Link 
      href={`/legal-article/${article._id}`}
      className="block mb-6 w-full"
    >
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
            {article.category}
          </span>
          <div className="text-xs text-gray-500">
            {new Date(article.last_updated).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {article.summary}
        </p>
        
        {article.subcategories && article.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.subcategories.map((subcategory, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {subcategory}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <div>By {article.author.name}</div>
          <div>{article.language}</div>
        </div>
      </div>
    </Link>
  );
}