import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (ingredient: string, category?: string) => void;
  onCategorySelect: (category: string) => void;
  loading: boolean;
  categories: string[];
}

export default function SearchBar({ onSearch, onCategorySelect, loading, categories }: SearchBarProps) {
  const [ingredient, setIngredient] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onSearch(ingredient.trim(), selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto mt-8">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Find Your Perfect Recipe</h2>
          <p className="mt-2 text-gray-600">
            Search by ingredient or select a category to discover delicious recipes
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <form onSubmit={handleSubmit} className="flex-1 flex gap-4">
            <input
              type="text"
              placeholder="Enter an ingredient (optional)"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading || (!ingredient.trim() && !selectedCategory)}
              className="flex items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}