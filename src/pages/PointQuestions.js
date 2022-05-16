import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

import { request } from '../utils/functions';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';

import QuestionOverlay from '../components/questions/QuestionOverlay';
import QuestionCard from '../components/questions/QuestionCard';

export default function PointQuestions() {
  const { setShowLoadingSpinner, setDialog } = useGlobalContext();

  const { hash } = useParams();

  // when is answering is true, user can see the question and answer it
  const [isAnswering, setIsAnswering] = useState(false);

  const [overlayTitle, setOverlayTitle] = useState(
    'Prišli ste na stran za odgovarjanje na vprašanja posamezne točke. Ko boste pripravljeni odgovarjati, pritisnite spodnji gumb.'
  );
  const [overlayText, setOverlayText] = useState('Prični odgovarjati');

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [question, setQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(null);
  const [answerId, setAnswerId] = useState(null);

  const getQuestion = useCallback(() => {
    setShowLoadingSpinner(true);
    request(`/point_questions/${hash}`)
      .then(data => {
        setNumberOfQuestions(data);
        return request(`/questions/${hash}`);
      })
      .then(data => {
        setShowLoadingSpinner(false);

        setAnswerId(data.question.answers[0]?.answer_id);
        setQuestionIndex(data.index);
        setQuestion(data.question);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju vprašanj',
          text: 'Prišlo je do napake pri pridobivanju vprašanj. Poskusite znova.',
        });
      });
  }, [hash, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  return (
    <Container mode="page">
      <div className="small-container">
        <Card>
          {question && !isAnswering && (
            <QuestionOverlay
              setIsAnswering={setIsAnswering}
              title={overlayTitle}
              text={overlayText}
            />
          )}

          {question && isAnswering && (
            <QuestionCard
              question={question}
              answerId={answerId}
              setAnswerId={setAnswerId}
            />
          )}
        </Card>
      </div>
    </Container>
  );
}
