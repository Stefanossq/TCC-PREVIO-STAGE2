
import React, { useState, useCallback } from 'react';
import { ProjectType } from './types';
import SelectionScreen from './components/SelectionScreen';
import GenerationScreen from './components/GenerationScreen';
import ResultScreen from './components/ResultScreen';
import ThemeScreen from './components/ThemeScreen';
import { PROJECT_TEMPLATES, createConvexProductsContent, AIProduct } from './lib/templates';
import { generateProductsWithImages, generateCarProductsWithImages } from './lib/gemini';


const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'theme' | 'generating' | 'result'>('selection');
  const [project, setProject] = useState<{
    type: ProjectType;
    name: string;
    lifecycle: string[];
    files: Record<string, any>;
  } | null>(null);

  const handleSelectProject = useCallback((projectType: ProjectType) => {
    if (projectType === 'store') {
      setStep('theme');
    } else {
      const template = PROJECT_TEMPLATES.blog;
      setProject({
        type: 'blog',
        name: template.name,
        lifecycle: template.lifecycle,
        files: template.files,
      });
      setStep('generating');
    }
  }, []);

  const handleGenerateProducts = useCallback(async (theme: string) => {
    let generationResult;
    let lifecyclePrefix = 'Gerando produtos e imagens com IA ✨';

    if (theme === '__CARS__') {
        lifecyclePrefix = 'Buscando dados de veículos e gerando imagens 🚗';
        generationResult = await generateCarProductsWithImages();
    } else {
        generationResult = await generateProductsWithImages(theme);
    }
    
    const { products: aiProducts, images: productImages } = generationResult;
    
    const template = PROJECT_TEMPLATES.store;
    const updatedFiles = { ...template.files };

    const imagePaths: string[] = [];
    productImages.forEach((base64Image, index) => {
        if (base64Image) {
            const imagePath = `public/images/product_${index}.png`;
            updatedFiles[imagePath] = { base64: base64Image };
            imagePaths.push(`/${imagePath.replace('public/', '')}`);
        } else {
            // Use a placeholder if image generation failed for this product
            const placeholderText = theme === '__CARS__' ? aiProducts[index].name : "Imagem Indisponível";
            imagePaths.push(`https://placehold.co/300x300/1f2937/d1d5db?text=${encodeURIComponent(placeholderText)}`);
        }
    });

    const newProductsFileContent = createConvexProductsContent(aiProducts, imagePaths);
    updatedFiles['convex/products.ts'] = newProductsFileContent;

    const updatedLifecycle = [
      lifecyclePrefix,
      ...template.lifecycle,
    ];

    setProject({
      type: 'store',
      name: template.name,
      lifecycle: updatedLifecycle,
      files: updatedFiles,
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
        {step === 'theme' && <ThemeScreen onGenerate={handleGenerateProducts} />}
        {step === 'generating' && project && (
          <GenerationScreen
            projectName={project.name}
            lifecycleSteps={project.lifecycle}
            onComplete={handleGenerationComplete}
          />
        )}
        {step === 'result' && project && (
          <ResultScreen projectType={project.type} projectFiles={project.files} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default App;
