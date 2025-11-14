
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Welcome from './pages/Welcome';
import TextGenerator from './pages/TextGenerator';
import JsonFormatter from './pages/JsonFormatter';
import Base64Encoder from './pages/Base64Encoder';
import Header from './components/Header';

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

export default App;
