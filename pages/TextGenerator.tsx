
import React, { useState, useCallback } from 'react';
import { generateText } from '../services/geminiService';

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('لطفاً یک درخواست وارد کنید.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult('');
    try {
      const generated = await generateText(prompt);
      setResult(generated);
    } catch (err) {
      setError('خطا در تولید متن. لطفاً دوباره امتحان کنید.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">تولید کننده متن با Gemini</h2>
      <p className="mb-6 text-slate-400">
        درخواست خود را در کادر زیر وارد کنید و اجازه دهید Gemini برای شما متن تولید کند.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
            درخواست شما
          </label>
          <textarea
            id="prompt"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="مثال: یک داستان کوتاه در مورد یک ربات که شعر می‌نویسد بنویس"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition flex items-center"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'در حال تولید...' : 'تولید کن'}
          </button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {result && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">نتیجه:</h3>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 whitespace-pre-wrap text-slate-200">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextGenerator;
