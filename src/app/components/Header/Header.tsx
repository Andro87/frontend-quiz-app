import styles from "./Header.module.scss";

import { useState, useEffect } from "react";

import SunDark from "svgr/icon-sun-dark.svg";
import SunLight from "svgr/icon-sun-light.svg";
import MoonDark from "svgr/icon-moon-dark.svg";
import MoonLight from "svgr/icon-moon-light.svg";

import { IconBox } from "..";

interface Props {
    readonly subject: string;
}

export const Header: React.FunctionComponent<Props> = props => {
    const { subject } = props;

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [isDarkMode]);

    const handleTheme = () => {
        setIsDarkMode(prevValue => !prevValue);
    };

    const sunIcon = isDarkMode ? <SunLight /> : <SunDark />;
    const moonIcon = isDarkMode ? <MoonLight /> : <MoonDark />;

    return (
        <header className={styles.header}>
            {subject && (
                <div className={styles.subject_container}>
                    <IconBox subject={subject} />
                    <p> {subject}</p>
                </div>
            )}

            <div className={styles.toggle} onClick={handleTheme}>
                <span>{sunIcon}</span>
                <div className={styles.toggle_wrap}>
                    <div
                        className={`${styles.toggle_circle}  ${
                            isDarkMode && styles.toggle_circle_dark
                        }`}
                    ></div>
                </div>
                <span>{moonIcon}</span>
            </div>
        </header>
    );
};
