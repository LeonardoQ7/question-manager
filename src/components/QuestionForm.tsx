import React from 'react';
import { Question, Translation } from '../types/Question';
import { PlusCircle, MinusCircle, Save, X } from 'lucide-react';

interface QuestionFormProps {
  onSubmit: (question: Omit<Question, 'id'>) => void;
  onCancel: () => void;
  initialData?: Question | null;
}

export function QuestionForm({ onSubmit, onCancel, initialData }: QuestionFormProps) {
  const [ptTranslation, setPtTranslation] = React.useState<Translation>(
    initialData?.translations['pt-BR'] || {
      text: '',
      options: [''],
      explanation: ''
    }
  );
  
  const [enTranslation, setEnTranslation] = React.useState<Translation>(
    initialData?.translations['en'] || {
      text: '',
      options: [''],
      explanation: ''
    }
  );
  
  const [correctAnswers, setCorrectAnswers] = React.useState<number[]>(
    initialData?.correctAnswers.map(i => i + 1) || []
  );
  const [correctAnswersInput, setCorrectAnswersInput] = React.useState(
    initialData?.correctAnswers.map(i => i + 1).join(',') || ''
  );
  const [minAnswers, setMinAnswers] = React.useState(initialData?.minAnswers || 1);
  const [maxAnswers, setMaxAnswers] = React.useState(initialData?.maxAnswers || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert from 1-based to 0-based indexing before submitting
    const zeroBasedAnswers = correctAnswers.map(n => n - 1);
    onSubmit({
      translations: {
        'pt-BR': ptTranslation,
        'en': enTranslation
      },
      correctAnswers: zeroBasedAnswers,
      minAnswers,
      maxAnswers
    });
  };

  const handleAddOption = (language: 'pt-BR' | 'en') => {
    const translation = language === 'pt-BR' ? ptTranslation : enTranslation;
    const setTranslation = language === 'pt-BR' ? setPtTranslation : setEnTranslation;
    
    setTranslation({
      ...translation,
      options: [...translation.options, '']
    });
  };

  const handleRemoveOption = (language: 'pt-BR' | 'en', index: number) => {
    const translation = language === 'pt-BR' ? ptTranslation : enTranslation;
    const setTranslation = language === 'pt-BR' ? setPtTranslation : setEnTranslation;
    
    setTranslation({
      ...translation,
      options: translation.options.filter((_, i) => i !== index)
    });

    // Update correct answers when removing an option
    setCorrectAnswers(prev => 
      prev.filter(n => n !== index + 1)
        .map(n => n > index + 1 ? n - 1 : n)
    );
    setCorrectAnswersInput(prev => 
      prev.split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => n !== index + 1)
        .map(n => n > index + 1 ? n - 1 : n)
        .join(',')
    );
  };

  const handleCorrectAnswersChange = (value: string) => {
    setCorrectAnswersInput(value);
    
    // Parse and validate the input
    const values = value
      .split(',')
      .map(v => v.trim())
      .filter(v => v !== '')
      .map(v => parseInt(v, 10))
      .filter(n => !isNaN(n) && n > 0 && n <= ptTranslation.options.length);
    
    setCorrectAnswers(values);
  };

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* Portuguese Translation */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Portuguese (BR) Translation</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Question Text</label>
            <input
              type="text"
              value={ptTranslation.text}
              onChange={(e) => setPtTranslation({ ...ptTranslation, text: e.target.value })}
              className={inputClasses}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Options</label>
            {ptTranslation.options.map((option, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...ptTranslation.options];
                    newOptions[index] = e.target.value;
                    setPtTranslation({ ...ptTranslation, options: newOptions });
                  }}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption('pt-BR', index)}
                  className="text-red-500 dark:text-red-400"
                >
                  <MinusCircle size={24} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption('pt-BR')}
              className="mt-2 flex items-center text-blue-500 dark:text-blue-400"
            >
              <PlusCircle size={24} className="mr-1" /> Add Option
            </button>
          </div>

          <div>
            <label className={labelClasses}>Explanation</label>
            <textarea
              value={ptTranslation.explanation}
              onChange={(e) => setPtTranslation({ ...ptTranslation, explanation: e.target.value })}
              className={inputClasses}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* English Translation */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">English Translation</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Question Text</label>
            <input
              type="text"
              value={enTranslation.text}
              onChange={(e) => setEnTranslation({ ...enTranslation, text: e.target.value })}
              className={inputClasses}
            />
          </div>
          
          <div>
            <label className={labelClasses}>Options</label>
            {enTranslation.options.map((option, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...enTranslation.options];
                    newOptions[index] = e.target.value;
                    setEnTranslation({ ...enTranslation, options: newOptions });
                  }}
                  className={inputClasses}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption('en', index)}
                  className="text-red-500 dark:text-red-400"
                >
                  <MinusCircle size={24} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption('en')}
              className="mt-2 flex items-center text-blue-500 dark:text-blue-400"
            >
              <PlusCircle size={24} className="mr-1" /> Add Option
            </button>
          </div>

          <div>
            <label className={labelClasses}>Explanation</label>
            <textarea
              value={enTranslation.explanation}
              onChange={(e) => setEnTranslation({ ...enTranslation, explanation: e.target.value })}
              className={inputClasses}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Answer Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Answer Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Minimum Answers</label>
            <input
              type="number"
              min="1"
              value={minAnswers}
              onChange={(e) => setMinAnswers(Number(e.target.value))}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Maximum Answers</label>
            <input
              type="number"
              min={minAnswers}
              value={maxAnswers}
              onChange={(e) => setMaxAnswers(Number(e.target.value))}
              className={inputClasses}
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className={labelClasses}>Correct Answers (Option Numbers)</label>
          <input
            type="text"
            placeholder="e.g., 1,2,3"
            value={correctAnswersInput}
            onChange={(e) => handleCorrectAnswersChange(e.target.value)}
            className={inputClasses}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter the option numbers (1-based) separated by commas
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <X size={20} className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Save size={20} className="mr-2" />
          Save Question
        </button>
      </div>
    </form>
  );
}