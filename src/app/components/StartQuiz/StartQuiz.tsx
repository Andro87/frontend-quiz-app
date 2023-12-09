import { IconBox } from "..";
import styles from "./StartQuiz.module.scss";

import data from "allData/data.json";

interface Props {
    readonly userChoice: string;
    readonly onRadioBtn: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StartQuiz: React.FunctionComponent<Props> = props => {
    const { userChoice, onRadioBtn } = props;
    return (
        <section aria-label="start quiz" className={styles.section_start_quiz}>
            <div className={styles.start_intro}>
                <h1>
                    Welcome to the <span>Frontend Quiz!</span>
                </h1>
                <p>Pick a subject to get started.</p>
            </div>
            <div className={styles.start_subjects_container}>
                {data.quizzes.map((subject, index) => {
                    return (
                        <div className={styles.subject_container} key={index}>
                            <input
                                type="radio"
                                id={subject.title}
                                name="subject"
                                value={subject.title}
                                checked={userChoice === subject.title}
                                onChange={onRadioBtn}
                            />

                            <label htmlFor={subject.title}>
                                <IconBox subject={subject.title} />

                                {subject.title}
                            </label>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
