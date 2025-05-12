
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/jetbrains-mono/400.css';

// Apply dark theme by default
document.documentElement.classList.add('dark');

createRoot(document.getElementById("root")!).render(<App />);
