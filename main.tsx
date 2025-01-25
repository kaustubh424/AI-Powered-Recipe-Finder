// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Make sure App.tsx is in the same src directory
import './index.css';    // Make sure index.css is in the same src directory

// Ensure the root element exists in the HTML file (index.html)
const rootElement = document.getElementById('root')!;
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found. Make sure there's a div with id 'root' in your index.html");
}
