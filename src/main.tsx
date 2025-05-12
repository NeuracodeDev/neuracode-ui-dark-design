
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply dark theme by default
document.documentElement.classList.add('dark');
document.body.classList.add('antialiased');

createRoot(document.getElementById("root")!).render(<App />);
