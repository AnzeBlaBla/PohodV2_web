import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalContext';

import { request } from '../utils/functions';

import Container from '../components/UI/Container';
import Card from '../components/UI/Card';

import QuestionOverlay from '../components/questions/QuestionOverlay';
import QuestionCard from '../components/questions/QuestionCard';

export default function PointQuestions() {
  const { setShowLoadingSpinner, setDialog, setNotification } =
    useGlobalContext();

  const { hash } = useParams();

  const navigate = useNavigate();

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

  const [timerDuration, setTimerDuration] = useState(10);
  const [remainingTime, setRemainingTime] = useState(null);

  const onUpdateTimer = newRemainingTime => {
    localStorage.setItem(
      `remainingTime-${hash}-${questionIndex}`,
      newRemainingTime
    );
  };

  const getQuestion = useCallback(() => {
    if (questionIndex === numberOfQuestions) {
      navigate('/results');
    }

    setShowLoadingSpinner(true);
    request(`/point_questions/${hash}`)
      .then(data => {
        setNumberOfQuestions(data);
        return request(`/questions/${hash}`);
      })
      .then(data => {
        setShowLoadingSpinner(false);

        setTimerDuration(10);

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
  }, [
    hash,
    setShowLoadingSpinner,
    setDialog,
    navigate,
    numberOfQuestions,
    questionIndex,
  ]);

  const submitQuestion = useCallback(() => {
    setIsAnswering(false);

    setOverlayTitle('Vaš odgovor je bil uspešno poslan.');
    setOverlayText('Nadaljuj');

    setShowLoadingSpinner(true);

    // delete localStorage
    localStorage.removeItem(`remainingTime-${hash}-${questionIndex}`);

    request(`/questions/answer`, 'POST', {
      answer_id: answerId,
      point_hash: hash,
    })
      .then(data => {
        console.log(data, answerId);

        setShowLoadingSpinner(false);

        setNotification({
          title: `Vaš odgovor je bil ${
            data === 'CORRECT' ? 'pravilen' : 'nepravilen'
          }!`,
          type: data === 'CORRECT' ? 'success' : 'error',
        });

        getQuestion();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
      });
  }, [
    hash,
    answerId,
    setShowLoadingSpinner,
    setNotification,
    getQuestion,
    questionIndex,
  ]);

  useEffect(() => {
    getQuestion();

    const remainingTimeStored = +localStorage.getItem(
      `remainingTime-${hash}-${questionIndex}`
    );

    if (remainingTimeStored) {
      setRemainingTime(remainingTimeStored);
      console.log(remainingTimeStored);
    } else {
      setRemainingTime(timerDuration);
    }
  }, [getQuestion, hash, timerDuration, questionIndex]);

  return (
    <Container mode="page">
      {question && (
        <div className="small-container">
          <Card>
            {!isAnswering && (
              <QuestionOverlay
                setIsAnswering={setIsAnswering}
                title={overlayTitle}
                text={overlayText}
              />
            )}

            {isAnswering && remainingTime && (
              <QuestionCard
                question={question}
                answerId={answerId}
                numberOfQuestions={numberOfQuestions}
                questionIndex={questionIndex}
                setAnswerId={setAnswerId}
                submitQuestion={submitQuestion}
                timerDuration={timerDuration}
                remainingTime={remainingTime}
                onComplete={submitQuestion}
                onUpdate={onUpdateTimer}
                isAnswering
              />
            )}
          </Card>
        </div>
      )}
    </Container>
  );
}
