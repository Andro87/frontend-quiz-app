import { IconBox } from "..";
import styles from "./QuizResult.module.scss";

interface Props {
    readonly subject: string;
    readonly score: number;
    readonly onStartGame: () => void;
}

export const QuizResult: React.FunctionComponent<Props> = props => {
    const { subject, score, onStartGame } = props;
    return (
        <section aria-label="show the result" className={styles.section_result}>
            <div className={styles.result_intro}>
                <h2>
                    Quiz completed <span>You scored...</span>
                </h2>
            </div>
            <div className={styles.result_info}>
                <div className={styles.result}>
                    <div className={styles.result_subject}>
                        <IconBox subject={subject} />

                        <p>{subject}</p>
                    </div>
                    <p className={styles.result_wrapper}>
                        <span>{score}</span> of out 10
                    </p>
                </div>

                <button
                    type="button"
                    title="play again"
                    onClick={onStartGame}
                    className={styles.btn_start}
                >
                    play again
                </button>
            </div>
        </section>
    );
};
