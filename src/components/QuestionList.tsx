import React, { useState } from 'react';
import { Question } from '../types/Question';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { FileActions } from './FileActions';

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  onImport: (questions: Question[]) => void;
}

export function QuestionList({ questions, onEdit, onDelete, onImport }: QuestionListProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedQuestions(prev =>
      prev.includes(id)
        ? prev.filter(qId => qId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Total Questions: {questions.length}
        </p>
        <FileActions questions={questions} onImport={onImport} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {questions.map((question) => {
          const isExpanded = expandedQuestions.includes(question.id);
          return (
            <div 
              key={question.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium">
                      ID: {question.id}
                    </span>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                      {question.translations['pt-BR'].text}
                    </h3>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => onEdit(question)}
                      className="p-1.5 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(question.id)}
                      className="p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => toggleExpand(question.id)}
                      className="p-1.5 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                    Min: {question.minAnswers}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                    Max: {question.maxAnswers}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs">
                    Correct: {question.correctAnswers.map(i => i + 1).join(', ')}
                  </span>
                </div>
              </div>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="p-4 space-y-4">
                  {/* Portuguese */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Portuguese (BR)
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {question.translations['pt-BR'].text}
                    </p>
                    <ul className="space-y-1">
                      {question.translations['pt-BR'].options.map((option, index) => (
                        <li 
                          key={index} 
                          className={`text-sm flex items-center ${
                            question.correctAnswers.includes(index)
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <span className="w-6">{index + 1}.</span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* English */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      English
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {question.translations['en'].text}
                    </p>
                    <ul className="space-y-1">
                      {question.translations['en'].options.map((option, index) => (
                        <li 
                          key={index} 
                          className={`text-sm flex items-center ${
                            question.correctAnswers.includes(index)
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          <span className="w-6">{index + 1}.</span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No questions added yet. Click the "Add Question" button to create your first question, or import existing questions.
        </div>
      )}
    </div>
  );
}