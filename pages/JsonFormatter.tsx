
import React, { useState, useCallback } from 'react';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError('لطفاً مقداری JSON برای فرمت کردن وارد کنید.');
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError('JSON نامعتبر است. لطفاً ورودی خود را بررسی کنید.');
      setOutput('');
    }
  }, [input]);

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">فرمت دهنده JSON</h2>
      <p className="mb-6 text-slate-400">
        JSON خود را در کادر سمت راست وارد کنید و دکمه "فرمت" را بزنید تا نسخه زیباسازی شده آن را در سمت چپ مشاهده کنید.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="json-input" className="block text-sm font-medium text-slate-300 mb-2">
            ورودی JSON
          </label>
          <textarea
            id="json-input"
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "name": "John", "age": 30, "isStudent": false }'
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition font-mono"
            style={{ direction: 'ltr' }}
          />
        </div>
        <div>
          <label htmlFor="json-output" className="block text-sm font-medium text-slate-300 mb-2">
            خروجی فرمت شده
          </label>
          <textarea
            id="json-output"
            rows={15}
            value={output}
            readOnly
            placeholder="نتیجه در اینجا نمایش داده می‌شود..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 font-mono"
            style={{ direction: 'ltr' }}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center items-center flex-col">
        <button
          onClick={handleFormat}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          فرمت
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default JsonFormatter;
