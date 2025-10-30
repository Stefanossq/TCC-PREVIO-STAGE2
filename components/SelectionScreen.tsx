
import React from 'react';
import { ProjectType } from '../types';

interface SelectionScreenProps {
  onSelect: (project: ProjectType) => void;
}

const SelectionCard: React.FC<{ title: string; description: string; onClick: () => void }> = ({ title, description, onClick }) => (
    <div
        onClick={onClick}
        className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center cursor-pointer transform hover:scale-105 hover:border-cyan-400 transition-all duration-300 group"
    >
        <h3 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h3>
        <p className="text-gray-400 group-hover:text-gray-300">{description}</p>
    </div>
);

const SelectionScreen: React.FC<SelectionScreenProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Gerador de Estrutura de Projeto
        </h1>
        <p className="text-lg text-gray-400">
            Selecione o tipo de projeto que deseja gerar.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectionCard
          title="1. Loja Simples"
          description="Gera a estrutura básica para uma aplicação de e-commerce."
          onClick={() => onSelect('store')}
        />
        <SelectionCard
          title="2. Blog Pessoal"
          description="Gera a estrutura de arquivos para um blog pessoal moderno."
          onClick={() => onSelect('blog')}
        />
      </div>
    </div>
  );
};

export default SelectionScreen;
