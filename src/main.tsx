
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Error boundary for the React application
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

// Create a root
const root = createRoot(rootElement);

// Render the application
try {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to render the application:', error);
  root.render(
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
      <p className="mb-4">We're sorry, but there was an error loading the application.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reload Page
      </button>
    </div>
  );
}
