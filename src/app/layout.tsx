import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "styles/style.scss";

const rubik = Rubik({ subsets: ["latin"] });

export const viewport = {
    width: "device-width",
    initialScale: 1
};

export const metadata: Metadata = {
    title: "Frontend Quizz App",
    description: "A quiz app to test your knowledge"
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={rubik.className}>{children}</body>
        </html>
    );
}
