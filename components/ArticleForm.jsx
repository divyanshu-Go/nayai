"use client";
import { useState } from "react";
import { PlusCircle, Trash2, Save, X, HelpCircle, Link2, FileText, Tag, BookOpen, List, Landmark, HelpingHand, Eye, Languages, Check } from "lucide-react";

const ArticleCreationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    subcategories: "",
    legal_acts: "",
    faqs: [{ question: "", answer: "" }],
    links: [{ linkTitle: "", linkUrl: "" }],
    examples: "",
    language: "English",
    status: "draft"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs: updatedFaqs }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  const removeFaq = (index) => {
    if (formData.faqs.length > 1) {
      const updatedFaqs = formData.faqs.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, faqs: updatedFaqs }));
    }
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData((prev) => ({ ...prev, links: updatedLinks }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [...prev.links, { linkTitle: "", linkUrl: "" }]
    }));
  };

  const removeLink = (index) => {
    if (formData.links.length > 1) {
      const updatedLinks = formData.links.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, links: updatedLinks }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Format data for API
      const dataToSubmit = {
        ...formData,
        subcategories: formData.subcategories.split(",").map(item => item.trim()).filter(Boolean),
        legal_acts: formData.legal_acts.split(",").map(item => item.trim()).filter(Boolean),
        // Remove empty FAQs
        faqs: formData.faqs.filter(faq => faq.question.trim() !== "" && faq.answer.trim() !== ""),
        // Remove empty links
        links: formData.links.filter(link => link.linkTitle.trim() !== "" && link.linkUrl.trim() !== "")
      };

      const response = await fetch("/api/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create article");
      }

      setSuccess(true);
      // Reset form after successful submission
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "",
        subcategories: "",
        legal_acts: "",
        faqs: [{ question: "", answer: "" }],
        links: [{ linkTitle: "", linkUrl: "" }],
        examples: "",
        language: "English",
        status: "draft"
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
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

  const languageOptions = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center">
          <FileText className="mr-2 text-blue-600" size={24} />
          Create Legal Article
        </h1>
        <p className="text-gray-500 mb-6">Fill in the details to create a new legal article for publication</p>
        
        {error && (
          <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md flex items-center justify-between">
            <p>{error}</p>
            <button onClick={() => setError(null)}>
              <X size={20} />
            </button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md flex items-center justify-between">
            <p className="flex items-center">
              <Check size={18} className="mr-2" />
              Article created successfully!
            </p>
            <button onClick={() => setSuccess(false)}>
              <X size={20} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-5">
            <label htmlFor="title" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <BookOpen size={16} className="mr-1.5 text-gray-600" />
              Title <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a descriptive title for the article"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Choose a clear, specific title that accurately reflects the article content
            </p>
          </div>

          {/* Summary */}
          <div className="mb-5">
            <label htmlFor="summary" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText size={16} className="mr-1.5 text-gray-600" />
              Summary <span className="text-red-500 ml-1">*</span>
              <span className="text-gray-500 text-xs ml-2">(150-250 characters)</span>
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              minLength="150"
              maxLength="250"
              placeholder="Provide a concise summary of the legal information"
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <HelpCircle size={12} className="mr-1" />
              {formData.summary.length}/250 characters. This summary will appear in search results and article listings.
            </p>
          </div>

          {/* Main Content */}
          <div className="mb-5">
            <label htmlFor="content" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText size={16} className="mr-1.5 text-gray-600" />
              Main Content <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="10"
              placeholder="Write the full content of the legal article here..."
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <HelpCircle size={12} className="mr-1" />
              Supports Markdown formatting for headings, lists, emphasis, etc.
            </p>
          </div>

          {/* Two columns for categories and status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Main Category */}
            <div>
              <label htmlFor="category" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Tag size={16} className="mr-1.5 text-gray-600" />
                Main Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select the primary legal area this article belongs to
              </p>
            </div>

            {/* Language */}
            <div>
              <label htmlFor="language" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Languages size={16} className="mr-1.5 text-gray-600" />
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Select the language in which this article is written
              </p>
            </div>
          </div>

          {/* Two columns for subcategories and legal acts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Subcategories */}
            <div>
              <label htmlFor="subcategories" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <List size={16} className="mr-1.5 text-gray-600" />
                Subcategories <span className="text-gray-500 text-xs ml-1">(comma-separated)</span>
              </label>
              <input
                type="text"
                id="subcategories"
                name="subcategories"
                value={formData.subcategories}
                onChange={handleChange}
                placeholder="e.g. PF, ESI, Gratuity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <HelpCircle size={12} className="mr-1" />
                Add relevant subtopics to help with article categorization and search
              </p>
            </div>

            {/* Legal Acts */}
            <div>
              <label htmlFor="legal_acts" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Landmark size={16} className="mr-1.5 text-gray-600" />
                Legal Acts Involved <span className="text-gray-500 text-xs ml-1">(comma-separated)</span>
              </label>
              <input
                type="text"
                id="legal_acts"
                name="legal_acts"
                value={formData.legal_acts}
                onChange={handleChange}
                placeholder="e.g. Industrial Disputes Act, 1947"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                List relevant laws and acts that pertain to this article
              </p>
            </div>
          </div>

          {/* Links - New Section */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <Link2 size={16} className="mr-1.5 text-gray-600" />
                Reference Links
              </label>
              <button
                type="button"
                onClick={addLink}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} className="mr-1" />
                Add Link
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">
              Add useful external references, official resources, or related websites
            </p>
            
            {formData.links.map((link, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <Link2 size={14} className="mr-1.5 text-blue-600" />
                    Reference #{index + 1}
                  </h4>
                  {formData.links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`linkTitle-${index}`} className="block text-xs text-gray-600 mb-1">
                    Link Title
                  </label>
                  <input
                    type="text"
                    id={`linkTitle-${index}`}
                    value={link.linkTitle}
                    onChange={(e) => handleLinkChange(index, "linkTitle", e.target.value)}
                    placeholder="e.g. Official Government Portal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor={`linkUrl-${index}`} className="block text-xs text-gray-600 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    id={`linkUrl-${index}`}
                    value={link.linkUrl}
                    onChange={(e) => handleLinkChange(index, "linkUrl", e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <label className=" text-sm font-medium text-gray-700 flex items-center">
                <HelpingHand size={16} className="mr-1.5 text-gray-600" />
                FAQs
              </label>
              <button
                type="button"
                onClick={addFaq}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} className="mr-1" />
                Add FAQ
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">
              Add frequently asked questions to address common concerns
            </p>
            
            {formData.faqs.map((faq, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium flex items-center">
                    <HelpCircle size={14} className="mr-1.5 text-blue-600" />
                    FAQ #{index + 1}
                  </h4>
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                
                <div className="mb-3">
                  <label htmlFor={`question-${index}`} className="block text-xs text-gray-600 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                    placeholder="e.g. What are my rights in this situation?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor={`answer-${index}`} className="block text-xs text-gray-600 mb-1">
                    Answer
                  </label>
                  <textarea
                    id={`answer-${index}`}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                    placeholder="Provide a clear, concise answer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>

          {/* Examples */}
          <div className="mb-5">
            <label htmlFor="examples" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText size={16} className="mr-1.5 text-gray-600" />
              Examples <span className="text-gray-500 text-xs ml-1">(optional)</span>
            </label>
            <textarea
              id="examples"
              name="examples"
              value={formData.examples}
              onChange={handleChange}
              placeholder="Provide real-world examples or case studies"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <HelpCircle size={12} className="mr-1" />
              Good examples help readers understand complex legal concepts
            </p>
          </div>

          {/* Visibility Status */}
          <div className="mb-6">
            <label htmlFor="status" className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Eye size={16} className="mr-1.5 text-gray-600" />
              Visibility Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Draft articles are only visible to admins, published articles are public
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-5 py-2 rounded-md text-white font-medium ${
                isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleCreationForm;