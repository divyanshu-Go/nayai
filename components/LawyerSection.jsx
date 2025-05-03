'use client';

import LawyerCard from './LawyerCard';

export default function LawyerSection({ lawyers, selectedCategory }) {
  const filteredLawyers =
    selectedCategory === 'All Categories'
      ? lawyers
      : lawyers?.filter(l =>
          Array.isArray(l.category) && l.category.includes(selectedCategory)
        );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {selectedCategory}
        </h2>
        <p className="text-gray-600">
          {filteredLawyers?.length || 0} lawyer
          {filteredLawyers?.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredLawyers && filteredLawyers.length > 0 ? (
        <div className="space-y-6">
          {filteredLawyers.map(lawyer => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">No lawyers found in this category.</p>
        </div>
      )}
    </div>
  );
}
