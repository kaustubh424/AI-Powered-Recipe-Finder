import { useEffect, useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import { useRecipes } from './hooks/useRecipes';
import { Recipe } from './services/api';

export default function App() {
  const { 
    recipes, 
    loading, 
    error, 
    categories,
    searchMeals,
    searchByCategory,
    fetchCategories 
  } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchCategories();
    // Auto-select beef category on load
    searchByCategory('Beef');
  }, [fetchCategories, searchByCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          onSearch={searchMeals}
          onCategorySelect={searchByCategory}
          loading={loading}
          categories={categories}
        />
        
        {error && (
          <div className="mt-8 text-center text-red-600">
            {error}
          </div>
        )}
        
        {recipes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Found {recipes.length} Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          </div>
        )}
        
        {!loading && !error && recipes.length === 0 && (
          <div className="mt-12 text-center text-gray-600">
            Select a category or enter an ingredient to search for recipes
          </div>
        )}

        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </main>
    </div>
  );
}