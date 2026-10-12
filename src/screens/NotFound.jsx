import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Page not found</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-xs">
        This page isn't part of the Cheerio Guide prototype. Head back home or explore the templates.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="md"
          icon={<Home className="w-4 h-4" />}
          onClick={() => navigate('/')}
        >
          Go home
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/templates')}
        >
          View Templates
        </Button>
      </div>
    </div>
  );
}
