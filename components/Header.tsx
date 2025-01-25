import { CookingPot } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CookingPot className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Recipe Finder</h1>
          </div>
          <nav className="flex space-x-4">
            {['Home', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}