"use client";

import styles from "./page.module.scss";

import { useState, useEffect } from "react";

import { Header, StartQuiz, Quiz, QuizResult } from "./components";

import data from "allData/data.json";

import { Question } from "./modal/data";

export default function Home() {
    const [subject, setSubject] = useState("");

    const [questionsData, setQuestionsData] = useState<Question[]>();

    const [currentQuestionPosition, setCurrentQuestionPosition] = useState(0);

    const [answer, setAnswer] = useState("");

    const [checkAnswer, setCheckAnswer] = useState("");

    const [isMessage, setIsMessage] = useState(false);

    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    const [score, setScore] = useState(0);

    const handleData = (userChoice: string) => {
        return data.quizzes.filter(quiz => quiz.title === userChoice);
    };

    const handleStartBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubject(e.target.value);
    };

    const handleAnswerBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = () => {
        if (!answer) {
            setIsMessage(true);
            setCheckAnswer("");
        }

        if (answer === questionsData?.[currentQuestionPosition].answer) {
            setCheckAnswer("correct_answer");
            setScore(prevValue => prevValue + 1);
        }
        if (
            answer &&
            answer !== questionsData?.[currentQuestionPosition].answer
        ) {
            setCheckAnswer("incorrect_answer");
        }
    };

    const handleNextQuestion = () => {
        if (
            questionsData &&
            currentQuestionPosition + 1 < questionsData?.length
        ) {
            setCurrentQuestionPosition(prev => prev + 1);
            setIsMessage(false);
            setAnswer("");
            setCheckAnswer("");
        }
        if (questionsData?.length === currentQuestionPosition + 1) {
            setIsQuizCompleted(true);
        }
    };

    const handleStartGame = () => {
        setIsQuizCompleted(false);
        setSubject("");
        setCurrentQuestionPosition(0);
        setCheckAnswer("");
        setAnswer("");
    };

    useEffect(() => {
        if (subject) {
            const questions = handleData(subject)[0].questions;
            setQuestionsData(questions);
        }
    }, [subject]);

    return (
        <div className={styles.home}>
            <div className={styles.home_container}>
                <Header subject={subject} />

                <main className={styles.main}>
                    {!subject && (
                        <StartQuiz
                            userChoice={subject}
                            onRadioBtn={handleStartBtn}
                        />
                    )}

                    {subject && !isQuizCompleted && (
                        <Quiz
                            questionNumber={currentQuestionPosition + 1}
                            question={
                                questionsData?.[currentQuestionPosition]
                                    .question
                            }
                            answers={
                                questionsData?.[currentQuestionPosition].options
                            }
                            userChoice={answer}
                            onAnswerBtn={handleAnswerBtn}
                            checkAnswer={checkAnswer}
                            correctAnswer={
                                questionsData?.[currentQuestionPosition].answer
                            }
                            onSubmitAnswer={handleSubmitAnswer}
                            onNextQuestion={handleNextQuestion}
                            message={isMessage}
                        />
                    )}

                    {isQuizCompleted && (
                        <QuizResult
                            subject={subject}
                            score={score}
                            onStartGame={handleStartGame}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
