import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { ProjectType, FileNode } from '../types';
import { PROJECT_TEMPLATES } from '../lib/templates';
import { generateProjectZip } from '../lib/generateProject';
import { buildFileTree } from '../lib/utils';
import { FolderIcon, FileIcon } from './icons';

declare global {
    interface Window {
        hljs: any;
    }
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onSelectFile: (file: FileNode) => void;
  selectedFile: FileNode | null;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ node, level, onSelectFile, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(level < 2);

  const isFolder = node.type === 'folder';
  const isSelected = !isFolder && selectedFile?.name === node.name && JSON.stringify(selectedFile) === JSON.stringify(node);

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelectFile(node);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center space-x-2 py-1.5 px-2 cursor-pointer rounded transition-colors duration-150 ${
          isSelected ? 'bg-cyan-500/20' : 'hover:bg-gray-700/50'
        }`}
        style={{ paddingLeft: `${level * 1.25 + 0.5}rem` }}
        onClick={handleClick}
      >
        {isFolder ? (
          <FolderIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        ) : (
          <FileIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
        <span className="text-gray-300 truncate text-sm">{node.name}</span>
      </div>
      {isFolder && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeItem key={`${child.name}-${index}`} node={child} level={level + 1} onSelectFile={onSelectFile} selectedFile={selectedFile} />
          ))}
        </div>
      )}
    </div>
  );
};


const ResultScreen: React.FC<{ projectType: ProjectType, projectFiles: Record<string, any>, onReset: () => void }> = ({ projectType, projectFiles, onReset }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const codeBlockRef = useRef<HTMLElement>(null);

  const project = PROJECT_TEMPLATES[projectType];
  const structure = useMemo(() => buildFileTree(projectFiles), [projectFiles]);

  useEffect(() => {
    const findFirstFile = (nodes: FileNode[]): FileNode | null => {
        for (const node of nodes) {
            if (node.type === 'file' && (node.name.endsWith('.tsx') || node.name.endsWith('README.md'))) return node;
            if (node.type === 'folder' && node.children) {
                const file = findFirstFile(node.children);
                if (file) return file;
            }
        }
        // Fallback to any file
        for (const node of nodes) {
            if (node.type === 'file') return node;
             if (node.type === 'folder' && node.children) {
                const file = findFirstFile(node.children);
                if (file) return file;
            }
        }
        return null;
    };
    const firstFile = findFirstFile(structure);
    setSelectedFile(firstFile);
  }, [structure]);

  useEffect(() => {
    if (selectedFile && codeBlockRef.current && window.hljs) {
      window.hljs.highlightElement(codeBlockRef.current);
    }
  }, [selectedFile]);

  const getFileLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const langMap: { [key: string]: string } = {
        'js': 'javascript', 'jsx': 'javascript', 'ts': 'typescript',
        'tsx': 'typescript', 'css': 'css', 'json': 'json',
        'md': 'markdown', 'html': 'html', 'gitignore': 'plaintext',
    };
    return langMap[extension] || 'plaintext';
  };

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      await generateProjectZip(projectType, projectFiles);
    } catch (error) {
      console.error("Failed to generate zip file:", error);
      alert("Ocorreu um erro ao gerar o arquivo zip.");
    } finally {
      setIsDownloading(false);
    }
  }, [projectType, projectFiles]);

  return (
    <div className="bg-gray-800 border border-gray-700/50 rounded-lg p-6 w-full flex flex-col space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-400">Projeto Gerado com Sucesso!</h2>
        <p className="text-gray-400 mt-1">Explore a estrutura de arquivos e baixe o projeto <span className="font-semibold text-gray-200">{project.name}</span>.</p>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4" style={{ height: '60vh' }}>
        <div className="md:w-1/4 bg-gray-900/50 border border-gray-700/50 rounded-md p-2 overflow-y-auto">
          {structure.map((node, index) => (
            <FileTreeItem key={index} node={node} level={0} onSelectFile={setSelectedFile} selectedFile={selectedFile} />
          ))}
        </div>

        <div className="flex-1 bg-gray-900 border border-gray-700/50 rounded-md overflow-hidden relative">
          {selectedFile ? (
            <>
              <div className="absolute top-2 right-3 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-md z-10">
                  {selectedFile.name}
              </div>
              <pre className="h-full overflow-auto !bg-transparent">
                <code
                  ref={codeBlockRef}
                  key={selectedFile.name}
                  className={`language-${getFileLanguage(selectedFile.name)} p-4 block text-sm`}
                >
                  {selectedFile.base64Content ? `[Conteúdo Binário: ${selectedFile.name}]` : selectedFile.content || ''}
                </code>
              </pre>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">Selecione um arquivo para visualizar.</div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full pt-4 border-t border-gray-700/50">
        <button onClick={onReset} className="w-full sm:w-auto flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
          Gerar Novo Projeto
        </button>
        <button onClick={handleDownload} disabled={isDownloading} className="w-full sm:w-auto flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-green-800 disabled:cursor-not-allowed flex items-center justify-center">
          {isDownloading ? (
             <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Baixando...</>
          ) : 'Baixar Projeto (.zip)'}
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
