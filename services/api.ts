const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  category: string;
  instructions: string;
  videoUrl: string;
  area?: string;
  tags?: string[];
}

interface MealDBResponse {
  meals: any[] | null;
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: MealDBResponse = await response.json();
    return data.meals?.map(category => category.strCategory) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: MealDBResponse = await response.json();
    
    if (!data.meals?.[0]) return null;
    
    const meal = data.meals[0];
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      instructions: meal.strInstructions,
      videoUrl: meal.strYoutube || '',
      area: meal.strArea,
      tags: meal.strTags?.split(',').filter(Boolean) || []
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
}

export async function searchRecipes(ingredient: string, category?: string): Promise<Recipe[]> {
  try {
    const url = category 
      ? `${API_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
      : `${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data: MealDBResponse = await response.json();
    
    if (!data.meals) return [];
    
    // Fetch recipes in smaller batches to avoid overwhelming the API
    const recipes: Recipe[] = [];
    for (let i = 0; i < data.meals.length; i += 5) {
      const batch = data.meals.slice(i, i + 5);
      const batchResults = await Promise.all(
        batch.map(meal => getRecipeById(meal.idMeal))
      );
      recipes.push(...batchResults.filter((recipe): recipe is Recipe => recipe !== null));
    }
    
    return recipes;
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}