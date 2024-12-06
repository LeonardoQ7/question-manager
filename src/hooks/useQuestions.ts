import { useState } from 'react';
import { Question } from '../types/Question';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const getNextId = () => {
    if (questions.length === 0) return 1;
    return Math.max(...questions.map(q => q.id)) + 1;
  };

  const addQuestion = (questionData: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: getNextId()
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(prev =>
      prev.map(q => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const deleteQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const importQuestions = (importedQuestions: Question[]) => {
    const startId = getNextId();
    const questionsWithNewIds = importedQuestions.map((q, index) => ({
      ...q,
      id: startId + index
    }));
    setQuestions(prev => [...prev, ...questionsWithNewIds]);
  };

  return {
    questions,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    importQuestions
  };
}