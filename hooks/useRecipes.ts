import { useState, useCallback } from 'react';
import { Recipe, searchRecipes, getCategories } from '../services/api';

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = useCallback(async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  }, []);

  const searchMeals = useCallback(async (ingredient: string, category?: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchRecipes(ingredient, category);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByCategory = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchRecipes('', category);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    recipes,
    loading,
    error,
    categories,
    searchMeals,
    searchByCategory,
    fetchCategories
  };
}