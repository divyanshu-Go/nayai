"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SchemeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Initialize formData with default values
  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    keyFeatures: [""],
    howToApply: { online: "", offline: "" },
    documentsRequired: [""],
    tags: [""],
    level: "",
    ministry: "",
    category: { incomeGroup: [], gender: [] },
    state: []
  });

  // Dropdown options
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
    "All State",
    "Andaman and Nicobar Islands",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
  ];

  const LEVELS = ["central", "state"];
  const GENDER = ["male", "female", "other"];
  const INCOME_GROUPS = ["EWS", "General", "OBC", "SC", "ST"];

  // Generic change handler that supports nested fields via dot notation (e.g. "howToApply.online")
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handles array field changes (keyFeatures, documentsRequired, tags)
  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  // Handle multi-select checkbox for nested category fields (incomeGroup, gender)
  const handleCheckboxChange = (e, parentField, subField) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentSelections = prev[parentField][subField];
      const updatedSelections = checked
        ? [...currentSelections, value]
        : currentSelections.filter((item) => item !== value);
      return {
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [subField]: updatedSelections,
        },
      };
    });
  };

  // For state checkboxes (top-level field)
  const handleStateCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedStates = checked
        ? [...prev.state, value]
        : prev.state.filter((item) => item !== value);
      return { ...prev, state: updatedStates };
    });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/scheme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create scheme");
      router.push("/schemes");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create New Scheme</h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title*</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Title</option>
            {TITLE.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {/* Objective */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Objective*</label>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Key Features*</label>
          {formData.keyFeatures.map((feature, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  handleArrayChange(idx, "keyFeatures", e.target.value)
                }
                className="flex-grow p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem("keyFeatures", idx)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                disabled={formData.keyFeatures.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("keyFeatures")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Feature
          </button>
        </div>

        {/* How To Apply */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            How To Apply
          </label>
          <div className="mb-2">
            <label className="block text-sm mb-1">Online</label>
            <textarea
              name="howToApply.online"
              value={formData.howToApply.online}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="2"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm mb-1">Offline</label>
            <textarea
              name="howToApply.offline"
              value={formData.howToApply.offline}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="2"
            ></textarea>
          </div>
        </div>

        {/* Documents Required */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Documents Required*
          </label>
          {formData.documentsRequired.map((doc, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={doc}
                onChange={(e) =>
                  handleArrayChange(idx, "documentsRequired", e.target.value)
                }
                className="flex-grow p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem("documentsRequired", idx)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                disabled={formData.documentsRequired.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("documentsRequired")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Document
          </button>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags*</label>
          {formData.tags.map((tag, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) =>
                  handleArrayChange(idx, "tags", e.target.value)
                }
                className="flex-grow p-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeArrayItem("tags", idx)}
                className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md"
                disabled={formData.tags.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("tags")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Tag
          </button>
        </div>

        {/* Level */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Level*</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Level</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Ministry */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ministry*</label>
          <select
            name="ministry"
            value={formData.ministry}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Ministry</option>
            {MINISTRIES.map((ministry) => (
              <option key={ministry} value={ministry}>
                {ministry}
              </option>
            ))}
          </select>
        </div>

        {/* Category: Income Group */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Income Group*
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {INCOME_GROUPS.map((group) => (
              <div key={group} className="flex items-center">
                <input
                  type="checkbox"
                  id={`income-${group}`}
                  value={group}
                  checked={formData.category.incomeGroup.includes(group)}
                  onChange={(e) =>
                    handleCheckboxChange(e, "category", "incomeGroup")
                  }
                  className="mr-2"
                />
                <label htmlFor={`income-${group}`}>{group}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Category: Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender*</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {GENDER.map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="checkbox"
                  id={`gender-${gender}`}
                  value={gender}
                  checked={formData.category.gender.includes(gender)}
                  onChange={(e) =>
                    handleCheckboxChange(e, "category", "gender")
                  }
                  className="mr-2"
                />
                <label htmlFor={`gender-${gender}`}>{gender}</label>
              </div>
            ))}
          </div>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">State*</label>
          <div className="max-h-60 overflow-y-auto border rounded-md p-2">
            {STATES.map((stateItem) => (
              <div key={stateItem} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`state-${stateItem}`}
                  value={stateItem}
                  checked={formData.state.includes(stateItem)}
                  onChange={handleStateCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={`state-${stateItem}`}>{stateItem}</label>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, state: [...STATES] }))
              }
              className="mr-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, state: [] }))
              }
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? "Creating..." : "Create Scheme"}
          </button>
        </div>
      </form>
    </div>
  );
}
