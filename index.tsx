
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface Tool {
  path: string;
  name: string;
  component: React.ComponentType;
  icon: React.ComponentType<{ className?: string }>;
}

// --- SERVICES ---
const generateText = async (prompt: string): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    return "خطا: کلید API یافت نشد. لطفاً مطمئن شوید که متغیر محیطی API_KEY تنظیم شده است.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    if (error instanceof Error) {
        return `خطا در ارتباط با Gemini API: ${error.message}`;
    }
    return "یک خطای ناشناخته رخ داد.";
  }
};


// --- ICONS ---
const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l-2.293 2.293a1 1 0 01-1.414 0L4 12m16 8v-4m-2 2h4m-5-16l2.293 2.293a1 1 0 010 1.414L14 12l2.293 2.293a1 1 0 011.414 0L20 12" />
  </svg>
);

const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const SwitchHorizontalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);


// --- PAGES ---
const Welcome: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
    <div className="max-w-2xl">
      <h2 className="text-4xl font-bold text-white mb-4">به جعبه ابزار توسعه دهنده خوش آمدید</h2>
      <p className="text-lg mb-8">
        مجموعه‌ای از ابزارهای کاربردی برای ساده‌سازی کارهای روزمره شما.
        یک ابزار را از منوی کناری انتخاب کنید تا شروع کنید.
      </p>
      <div className="animate-bounce">
        <svg className="w-10 h-10 text-blue-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>
  </div>
);

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
    const generated = await generateText(prompt);
    if(generated.startsWith('خطا:')){
        setError(generated);
    } else {
        setResult(generated);
    }
    setIsLoading(false);
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
        <button onClick={handleFormat} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
          فرمت
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
};

const Base64Encoder: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
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
          <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-md transition ${mode === 'encode' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
            رمزگذاری
          </button>
          <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-md transition ${mode === 'decode' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}>
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
          <button onClick={handleProcess} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
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


// --- COMPONENTS ---
const Header: React.FC = () => (
  <header className="bg-slate-800/50 backdrop-blur-sm shadow-md border-b border-slate-700 p-4 z-10">
    <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
      جعبه ابزار توسعه دهنده
    </h1>
  </header>
);

const Sidebar: React.FC = () => {
  const tools: Tool[] = [
    { path: '/text-generator', name: 'تولید کننده متن', component: TextGenerator, icon: SparklesIcon },
    { path: '/json-formatter', name: 'فرمت دهنده JSON', component: JsonFormatter, icon: CodeIcon },
    { path: '/base64-encoder', name: 'رمزگذار Base64', component: Base64Encoder, icon: SwitchHorizontalIcon },
  ];

  const baseLinkClasses = "flex items-center px-4 py-3 text-slate-300 rounded-lg transition-colors duration-200";
  const hoverClasses = "hover:bg-slate-700 hover:text-white";
  const activeLinkClasses = "bg-blue-600 text-white";
  const inactiveLinkClasses = "text-slate-400";

  return (
    <aside className="w-64 bg-slate-800 border-l border-slate-700 p-4 flex-shrink-0 hidden md:block">
      <div className="flex items-center justify-center mb-8">
         <NavLink to="/" className="text-2xl font-semibold text-white">ابزارها</NavLink>
      </div>
      <nav>
        <ul>
          {tools.map((tool) => (
            <li key={tool.path} className="mb-2">
              <NavLink
                to={tool.path}
                className={({ isActive }) => 
                  `${baseLinkClasses} ${hoverClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                }
              >
                <tool.icon className="w-6 h-6 ml-3" />
                <span>{tool.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};


// --- MAIN APP ---
const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-900 text-slate-300">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/text-generator" element={<TextGenerator />} />
            <Route path="/json-formatter" element={<JsonFormatter />} />
            <Route path="/base64-encoder" element={<Base64Encoder />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};


// --- RENDER ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
