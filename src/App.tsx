import React, { useState } from 'react';
import { Question } from './types/Question';
import { QuestionForm } from './components/QuestionForm';
import { QuestionList } from './components/QuestionList';
import { useQuestions } from './hooks/useQuestions';
import { PlusCircle } from 'lucide-react';
import { ThemeProvider, ThemeToggle } from './contexts/ThemeContext';

function App() {
  const { questions, addQuestion, updateQuestion, deleteQuestion, importQuestions } = useQuestions();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (questionData: Omit<Question, 'id'>) => {
    if (editingQuestion) {
      updateQuestion({ ...questionData, id: editingQuestion.id });
      setEditingQuestion(null);
    } else {
      addQuestion(questionData);
    }
    setIsFormVisible(false);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setEditingQuestion(null);
    setIsFormVisible(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question Manager</h1>
              <ThemeToggle />
            </div>
            <button
              onClick={() => {
                setEditingQuestion(null);
                setIsFormVisible(true);
              }}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Question
            </button>
          </div>

          {isFormVisible ? (
            <QuestionForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingQuestion}
            />
          ) : (
            <QuestionList
              questions={questions}
              onEdit={handleEdit}
              onDelete={deleteQuestion}
              onImport={importQuestions}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;