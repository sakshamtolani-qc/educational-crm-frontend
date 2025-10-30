import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExamDetails } from '@/components/Admin/Exams/ExamDetails';

export const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  if (!examId) {
    navigate('/exams');
    return null;
  }

  const handleBack = () => {
    navigate('/exams');
  };

  return <ExamDetails examId={examId} onBack={handleBack} />;
};