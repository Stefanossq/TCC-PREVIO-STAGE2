import React, { useState, useCallback } from 'react';
import { ProjectType } from './types';
import SelectionScreen from './components/SelectionScreen';
import GenerationScreen from './components/GenerationScreen';
import ResultScreen from './components/ResultScreen';
import { PROJECT_TEMPLATES } from './lib/templates';

const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'generating' | 'result'>('selection');
  const [project, setProject] = useState<{ type: ProjectType; name: string; lifecycle: string[] } | null>(null);

  const handleSelectProject = useCallback((projectType: ProjectType) => {
    const template = PROJECT_TEMPLATES[projectType];
    setProject({
      type: projectType,
      name: template.name,
      lifecycle: template.lifecycle,
    });
    setStep('generating');
  }, []);

  const handleGenerationComplete = useCallback(() => {
    setStep('result');
  }, []);

  const handleReset = useCallback(() => {
    setProject(null);
    setStep('selection');
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-7xl mx-auto">
        {step === 'selection' && <SelectionScreen onSelect={handleSelectProject} />}
        {step === 'generating' && project && (
          <GenerationScreen
            projectName={project.name}
            lifecycleSteps={project.lifecycle}
            onComplete={handleGenerationComplete}
          />
        )}
        {step === 'result' && project && (
          <ResultScreen projectType={project.type} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
