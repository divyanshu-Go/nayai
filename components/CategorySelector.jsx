'use client';

export default function CategorySelector({ selectedCategory, onCategoryChange }) {
  const categories = [
    "All Categories",
    "Employment Rights",
    "Housing & Tenant Rights",
    "Consumer Protection",
    "Women's Rights",
    "Senior Citizen Rights",
    "LGBTQ+ Rights",
    "SC/ST/OBC Rights",
    "Cyber Laws",
    "Marriage & Family Laws",
    "Criminal Law Basics",
    "RTI & Citizen Rights",
    "Property & Inheritance Laws",
    "Religious & Personal Laws",
    "Legal Aid & Procedure"
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm b">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Legal Categories</h2>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}