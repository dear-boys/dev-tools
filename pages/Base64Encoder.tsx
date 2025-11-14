
import React, { useState, useCallback } from 'react';

type Mode = 'encode' | 'decode';

const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<Mode>('encode');
  const [error, setError] = useState<string>('');

  const handleProcess = useCallback(() => {
    setError('');
    setOutput('');
    if (!input.trim()) {
      setError('لطفاً متنی برای پردازش وارد کنید.');
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setError('ورودی نامعتبر است. اگر در حال رمزگشایی هستید، مطمئن شوید که یک رشته Base64 معتبر است.');
    }
  }, [input, mode]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">رمزگذار/رمزگشای Base64</h2>
      <p className="mb-6 text-slate-400">
        متن خود را وارد کنید، حالت (رمزگذاری یا رمزگشایی) را انتخاب کرده و دکمه را فشار دهید.
      </p>

      <div className="flex justify-center mb-6">
        <div className="bg-slate-800 border border-slate-700 p-1 rounded-lg flex space-x-1">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-md transition ${mode === 'encode' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
          >
            رمزگذاری
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-md transition ${mode === 'decode' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
          >
            رمزگشایی
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="base64-input" className="block text-sm font-medium text-slate-300 mb-2">
            ورودی
          </label>
          <textarea
            id="base64-input"
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'سلام دنیا' : '2LPZitin2K8g2KLZvtiz'}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleProcess}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {mode === 'encode' ? 'رمزگذاری کن' : 'رمزگشایی کن'}
          </button>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        {output && (
          <div>
            <label htmlFor="base64-output" className="block text-sm font-medium text-slate-300 mb-2">
              خروجی
            </label>
            <textarea
              id="base64-output"
              rows={8}
              value={output}
              readOnly
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64Encoder;
