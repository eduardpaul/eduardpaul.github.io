import React from 'react';

const MarkdownParser = ({ text }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    return (
        <ul className="list-disc pl-5 text-slate-700 leading-relaxed space-y-2">
            {lines.map((line, index) => {
                const bolded = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-blue-700">$1</strong>');
                return <li key={index} dangerouslySetInnerHTML={{ __html: bolded.replace(/^- /, '') }} />;
            })}
        </ul>
    );
};

export default MarkdownParser;