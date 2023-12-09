import styles from "./IconBox.module.scss";

import data from "allData/data.json";

interface Props {
    readonly subject: string;
}

export const IconBox: React.FunctionComponent<Props> = props => {
    const { subject } = props;
    const subjectIconPath =
        subject &&
        data.quizzes.filter(element => element.title === subject)[0].icon;
    const iconBackground = subject.toLowerCase();

    return (
        <div className={`${styles.icon_container} ${styles[iconBackground]}`}>
            <img alt="" src={subjectIconPath} />
        </div>
    );
};
