import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 使用类型断言，告诉 TypeScript `document.getElementById('root')` 必定返回一个 HTMLElement
const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);