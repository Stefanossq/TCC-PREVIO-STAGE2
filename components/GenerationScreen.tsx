import React, { useState, useEffect } from 'react';
import { CheckIcon, SpinnerIcon } from './icons';

interface GenerationScreenProps {
  projectName: string;
  lifecycleSteps: string[];
  onComplete: () => void;
}

const GenerationScreen: React.FC<GenerationScreenProps> = ({ projectName, lifecycleSteps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (currentStep < lifecycleSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 700); // Delay between steps
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000); // Final delay before completing
      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete, lifecycleSteps.length]);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Gerando seu projeto: <span className="text-cyan-400">{projectName}</span></h2>
      <p className="text-center text-gray-400 mb-8">Por favor, aguarde enquanto montamos a estrutura do seu projeto...</p>
      <ul className="space-y-4">
        {lifecycleSteps.map((step, index) => (
          <li key={index} className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-6 h-6">
              {index < currentStep ? (
                <CheckIcon className="w-6 h-6 text-green-400" />
              ) : index === currentStep ? (
                <SpinnerIcon className="w-5 h-5 text-cyan-400" />
              ) : (
                <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
              )}
            </div>
            <span className={`transition-colors duration-300 ${index <= currentStep ? 'text-gray-200' : 'text-gray-500'}`}>
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenerationScreen;
