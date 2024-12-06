export interface Translation {
  text: string;
  options: string[];
  explanation: string;
}

export interface Question {
  id: number;
  translations: {
    'pt-BR': Translation;
    'en': Translation;
  };
  correctAnswers: number[];
  minAnswers: number;
  maxAnswers: number;
}