'use client';


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DisplayMarkdown = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default DisplayMarkdown;
