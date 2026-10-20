import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {bootstrapRoute} from './lib/router';
import './index.css';

// Rewrites legacy `#/...` links to clean paths before React reads the URL.
bootstrapRoute();

const root = document.getElementById('root')!;
root.replaceChildren();
createRoot(root).render(<App />);
