import { X, Volume2, ExternalLink, Clock } from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { Recipe } from '../services/api';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const { speak, isSpeaking } = useSpeech();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              {recipe.category}
            </span>
          </div>

          {recipe.area && (
            <div className="mb-4 text-gray-600">
              <span className="font-medium">Cuisine:</span> {recipe.area}
            </div>
          )}

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Instructions</h3>
            <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => speak(recipe.instructions)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              {isSpeaking ? 'Stop' : 'Listen to Instructions'}
            </button>

            {recipe.videoUrl && (
              <a
                href={recipe.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Watch Video
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}