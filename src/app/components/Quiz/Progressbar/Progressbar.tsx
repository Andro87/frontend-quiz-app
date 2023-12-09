import styles from "./Progressbar.module.scss";

interface Props {
    readonly percentage: number;
}

export const Progressbar: React.FunctionComponent<Props> = props => {
    const { percentage } = props;

    const progressbarWidth = {
        width: `${percentage}0%`
    };

    return (
        <div className={styles.progressbar_container}>
            <div className={styles.progressbar} style={progressbarWidth}></div>
        </div>
    );
};
