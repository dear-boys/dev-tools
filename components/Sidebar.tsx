
import React from 'react';
import { NavLink } from 'react-router-dom';
import { SparklesIcon } from './icons/SparklesIcon';
import { CodeIcon } from './icons/CodeIcon';
import { SwitchHorizontalIcon } from './icons/SwitchHorizontalIcon';
import type { Tool } from '../types';
import TextGenerator from '../pages/TextGenerator';
import JsonFormatter from '../pages/JsonFormatter';
import Base64Encoder from '../pages/Base64Encoder';

const tools: Tool[] = [
  { path: '/text-generator', name: 'تولید کننده متن', component: TextGenerator, icon: SparklesIcon },
  { path: '/json-formatter', name: 'فرمت دهنده JSON', component: JsonFormatter, icon: CodeIcon },
  { path: '/base64-encoder', name: 'رمزگذار Base64', component: Base64Encoder, icon: SwitchHorizontalIcon },
];

const Sidebar: React.FC = () => {
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

export default Sidebar;
