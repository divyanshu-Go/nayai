import { useArticles } from '@/context/ArticleContext';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ArticleDetail() {

    const { articles, articlesLoading } = useArticles();
    const params = useParams();
    const articleId = params?.articleId;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!articlesLoading && articles.length > 0) {
            const foundArticle = articles.find(art => art._id === articleId);
            setArticle(foundArticle);
            setLoading(false);
        }
    }, [articles, articlesLoading, articleId]);

    if (loading || articlesLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow">
                    <h2 className="text-xl font-medium text-red-700">Article Not Found</h2>
                    <p className="text-red-600">The article you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Article Header */}
            <header className="mb-8 border-b pb-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
                        {article.category}
                    </span>
                    <span className="mx-2">·</span>
                    <time dateTime={article.last_updated}>
                        {new Date(article.last_updated).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </time>
                    <span className="mx-2">·</span>
                    <span>{article.language}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {article.title}
                </h1>

                <p className="text-lg text-gray-700 mb-4">
                    {article.summary}
                </p>

                <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 font-medium">By {article.author.name}</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="prose max-w-none">
                <div className="mb-8">
                    {article.content}
                </div>

                {/* Subcategories */}
                {article.subcategories && article.subcategories.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Related Legal Areas</h2>
                        <div className="flex flex-wrap gap-2">
                            {article.subcategories.map((subcategory, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {subcategory}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Legal Acts */}
                {article.legal_acts && article.legal_acts.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Relevant Legislation</h2>
                        <ul className="list-disc list-inside space-y-1">
                            {article.legal_acts.map((act, index) => (
                                <li key={index} className="text-gray-700">{act}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Examples */}
                {article.examples && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Practical Examples</h2>
                        <div className="bg-gray-50 p-4 border-l-4 border-blue-500 rounded">
                            <p className="text-gray-700">{article.examples}</p>
                        </div>
                    </div>
                )}

                {/* FAQs */}
                {article.faqs && article.faqs.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {article.faqs.map((faq, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <h3 className="font-medium text-lg text-gray-900 mb-2">{faq.question}</h3>
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Useful Links */}
                {article.links && article.links.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">Useful Resources</h2>
                        <ul className="space-y-2">
                            {article.links.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.linkUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {link.linkTitle}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>

            {/* Article Footer */}
            <footer className="mt-8 pt-4 border-t text-sm text-gray-500">
                <div className="flex flex-wrap justify-between items-center">
                    <div>
                        <p>Last updated: {new Date(article.last_updated).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}</p>
                    </div>

                    {article.meta && article.meta.keywords && (
                        <div className="mt-2 md:mt-0">
                            <span className="block md:inline">Keywords: </span>
                            <span className="italic">{article.meta.keywords.join(', ')}</span>
                        </div>
                    )}
                </div>
            </footer>
        </div>
    );
}