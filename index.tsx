import * as React    from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'

// Render the app

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found');
}