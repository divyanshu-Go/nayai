'use client';

import { useState } from 'react';
import { useLawyer } from '@/context/LawyerContext';
import CategorySelector from '@/components/CategorySelector';
import LawyerSection from '@/components/LawyerSection';
import Loader from '@/components/Loader';

export default function ConsultLawyerPage() {
  const { lawyers, lawyerLoading } = useLawyer();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Consult a Lawyer</h1>

      {lawyerLoading ? (
        <Loader text="Loading Lawyers..." />
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <LawyerSection
              lawyers={lawyers}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
}
