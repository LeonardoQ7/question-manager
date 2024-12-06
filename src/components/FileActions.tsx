import React from 'react';
import { Question } from '../types/Question';
import { Download, Upload } from 'lucide-react';
import { downloadJson, readJsonFile } from '../utils/fileUtils';

interface FileActionsProps {
  questions: Question[];
  onImport: (questions: Question[]) => void;
}

export function FileActions({ questions, onImport }: FileActionsProps) {
  const handleDownload = () => {
    downloadJson(questions, 'questions.json');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await readJsonFile(file);
      if (Array.isArray(data)) {
        onImport(data as Question[]);
      } else {
        alert('Invalid file format. Expected an array of questions.');
      }
    } catch (error) {
      alert('Error reading file: ' + (error as Error).message);
    }

    // Reset the input to allow importing the same file again
    event.target.value = '';
  };

  return (
    <div className="flex items-center space-x-4">
      {questions.length > 0 && (
        <button
          onClick={handleDownload}
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Download Questions
        </button>
      )}

      <label className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
        <Upload size={20} className="mr-2" />
        Import Questions
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}