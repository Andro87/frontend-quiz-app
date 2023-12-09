import styles from "./Quiz.module.scss";

import Correct from "svgr/icon-correct.svg";
import Incorrect from "svgr/icon-incorrect.svg";
import { Progressbar } from "./Progressbar/Progressbar";

interface Props {
    readonly questionNumber: number;
    readonly question?: string;
    readonly answers?: string[];
    readonly userChoice: string;
    readonly onAnswerBtn: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly checkAnswer: string;
    readonly correctAnswer?: string;
    readonly onSubmitAnswer: () => void;
    readonly onNextQuestion: () => void;
    readonly message: boolean;
}

export const Quiz: React.FunctionComponent<Props> = props => {
    const {
        questionNumber,
        question,
        answers,
        userChoice,
        onAnswerBtn,
        checkAnswer,
        correctAnswer,
        onSubmitAnswer,
        onNextQuestion,
        message
    } = props;

    const letterOption = ["A", "B", "C", "D"];

    const icon =
        checkAnswer && checkAnswer === "correct_answer" ? (
            <Correct />
        ) : checkAnswer === "incorrect_answer" ? (
            <Incorrect />
        ) : (
            ""
        );

    return (
        <section aria-label="quiz" className={styles.section_quiz}>
            <div className={styles.question_container}>
                <span>Question {questionNumber} of 10 </span>
                <h2>{question}</h2>
                <Progressbar percentage={questionNumber} />
            </div>
            <div className={styles.container}>
                <div className={styles.answers_container}>
                    {answers &&
                        answers.map((answer, index) => {
                            return (
                                <div
                                    className={`${styles.answer_container} ${
                                        userChoice === answer && styles.isActive
                                    }
                             
                                
                                ${userChoice === answer && styles[checkAnswer]} 
                                
                                ${
                                    checkAnswer &&
                                    correctAnswer === answer &&
                                    styles.correct_answer
                                }
                                `}
                                    key={index}
                                >
                                    <input
                                        type="radio"
                                        id={`${index}-${answer}`}
                                        name="answer"
                                        value={answer}
                                        checked={userChoice === answer}
                                        onChange={onAnswerBtn}
                                    />

                                    <label htmlFor={`${index}-${answer}`}>
                                        <span>{letterOption[index]}</span>
                                        {answer}
                                        {userChoice === answer && icon}
                                    </label>
                                </div>
                            );
                        })}
                </div>

                <div className={styles.btns_container}>
                    {!checkAnswer ? (
                        <button
                            type="button"
                            title="submit answer"
                            onClick={onSubmitAnswer}
                            className={styles.btn_submit}
                        >
                            Submit answer
                        </button>
                    ) : (
                        <button
                            type="button"
                            title="next question"
                            onClick={onNextQuestion}
                            className={styles.btn_next}
                        >
                            next question
                        </button>
                    )}
                    {!userChoice && message && (
                        <p className={styles.message}>
                            <span>
                                <Incorrect />
                            </span>
                            Please select an answer
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};
