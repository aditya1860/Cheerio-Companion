import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GuideProvider } from './context/GuideContext';
import Shell from './components/layout/Shell';
import Home from './screens/Home';
import Templates from './screens/Templates';
import TemplateDetail from './screens/TemplateDetail';
import AdminDashboard from './screens/AdminDashboard';
import NotFound from './screens/NotFound';
import DemoControls from './DemoControls';

function ShellWithDemo({ children }) {
  return (
    <Shell>
      {children}
      <DemoControls />
    </Shell>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <ShellWithDemo><Home /></ShellWithDemo>,
  },
  {
    path: '/templates',
    element: <ShellWithDemo><Templates /></ShellWithDemo>,
  },
  {
    path: '/templates/:id',
    element: <ShellWithDemo><TemplateDetail /></ShellWithDemo>,
  },
  {
    path: '/admin',
    element: <ShellWithDemo><AdminDashboard /></ShellWithDemo>,
  },
  {
    path: '*',
    element: <ShellWithDemo><NotFound /></ShellWithDemo>,
  },
]);

export default function App() {
  return (
    <GuideProvider>
      <RouterProvider router={router} />
    </GuideProvider>
  );
}
