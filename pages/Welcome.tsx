
import React from 'react';

const Welcome: React.FC = () => {
  return (
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
};

export default Welcome;
