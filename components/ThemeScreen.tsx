import React, { useState } from 'react';
import { SpinnerIcon } from './icons';

interface ThemeScreenProps {
  onGenerate: (theme: string) => Promise<void>;
}

const ThemeScreen: React.FC<ThemeScreenProps> = ({ onGenerate }) => {
  const [theme, setTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) {
      setError('Por favor, insira um tema para a loja.');
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await onGenerate(theme);
    } catch (err) {
      setError((err as Error).message || 'Ocorreu um erro desconhecido.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Personalize sua Loja com IA
        </h1>
        <p className="text-lg text-gray-400">
          Descreva o tema da sua loja e nós geraremos produtos de exemplo para você!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg p-8 space-y-6">
        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-300 mb-2">
            Tema da Loja
          </label>
          <input
            type="text"
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-gray-900 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            placeholder="Ex: cafés especiais, artigos de papelaria, skate shop..."
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <SpinnerIcon className="w-5 h-5 mr-3" />
              Gerando Produtos e Imagens com IA...
            </>
          ) : (
            'Gerar Produtos com IA ✨'
          )}
        </button>
      </form>
    </div>
  );
};

export default ThemeScreen;