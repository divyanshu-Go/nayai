'use client';

import { useState } from 'react';
import SchemeCard from '@/components/SchemeCard';
import { useSchemes } from '@/context/SchemeContext';

// Constants
const TITLE = [
  "Women and Child",
  "Utility & Sanitation",
  "Travel & Tourism",
  "Transport & Infrastructure Sports & Culture",
  "Social welfare & Empowerment",
  "Skills & Employment",
  "Science, IT & Communications",
  "Public Safety,Law & Justice",
  "Housing & Shelter",
  "Health & Wellness",
  "Education & Learning",
  "Business & Entrepreneurship",
  "Banking, Financial Services and Insurance",
  "Agriculture,Rural & Environment"
];

const MINISTRIES = [
  "Ministry Of Culture",
  "Ministry Of Petroleum and Natural Gas",
  "Ministry Of Rural Development",
  "Ministry Of Housing & Urban Affairs",
  "Ministry Of Heavy Industries",
  "Ministry Of Health & Family Welfare",
  "Ministry Of Science And Technology",
  "Ministry Of Law and Justice",
  "Ministry Of Agriculture and Farmers Welfare",
  "Ministry Of Labour and Employment",
  "Ministry Of External Affairs",
  "Ministry Of Youth Affairs & Sports",
  "Ministry Of Micro, Small and Medium Enterprises",
  "Ministry Of Commerce And Industry",
  "Ministry Of Minority Affairs",
  "Ministry Of New and Renewable Energy",
  "Ministry Of Social Justice and Empowerment",
  "Ministry Of Finance",
  "Ministry Of Women and Child Development",
  "Ministry Of Jal Shakti",
  "Ministry Of Education",
  "Ministry Of Skill Development And Entrepreneurship"
];

const STATES = [
  "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const LEVELS = ["central", "state"];
const GENDER = ["male", "female", "other"];
const INCOME_GROUPS = ["EWS", "General", "OBC", "SC", "ST"];

const SchemeSearch = () => {
  const { schemes, schemesLoading } = useSchemes();

  const [filters, setFilters] = useState({
    title: '',
    ministry: '',
    state: '',
    level: '',
    gender: '',
    incomeGroup: '',
  });

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredSchemes = schemes?.filter(scheme => {
    return (
      (filters.title ? scheme.title === filters.title : true) &&
      (filters.ministry ? scheme.ministry === filters.ministry : true) &&
      (filters.state ? scheme.state.includes(filters.state) : true) &&
      (filters.level ? scheme.level === filters.level : true) &&
      (filters.gender ? scheme.category.gender.includes(filters.gender) : true) &&
      (filters.incomeGroup ? scheme.category.incomeGroup.includes(filters.incomeGroup) : true)
    );
  });

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select name="title" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Title</option>
          {TITLE.map((title, i) => <option key={i} value={title}>{title}</option>)}
        </select>

        <select name="ministry" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Ministry</option>
          {MINISTRIES.map((min, i) => <option key={i} value={min}>{min}</option>)}
        </select>

        <select name="state" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select State</option>
          {STATES.map((state, i) => <option key={i} value={state}>{state}</option>)}
        </select>

        <select name="level" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Level</option>
          {LEVELS.map((level, i) => <option key={i} value={level}>{level}</option>)}
        </select>

        <select name="gender" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Gender</option>
          {GENDER.map((g, i) => <option key={i} value={g}>{g}</option>)}
        </select>

        <select name="incomeGroup" onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">Select Income Group</option>
          {INCOME_GROUPS.map((inc, i) => <option key={i} value={inc}>{inc}</option>)}
        </select>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemesLoading ? (
          <p>Loading schemes...</p>
        ) : filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme, i) => (
            <SchemeCard key={i} scheme={scheme} />
          ))
        ) : (
          <p>No schemes match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default SchemeSearch;
