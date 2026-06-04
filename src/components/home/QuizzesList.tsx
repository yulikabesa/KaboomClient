import React, { useEffect, useRef } from "react";
import classes from "./QuizzesList.module.css";
import QuizDisplay from "./QuizDisplay";
import type { quizType } from "../../types/quiz";

const QuizzesList: React.FC<{
  quizzes: quizType[];
  isLoading: boolean;
}> = (props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(
      `.${classes.reveal}`,
    );

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.active);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [props.quizzes]);

  return (
    <div ref={containerRef} className={classes["product-list"]}>
      {!props.isLoading && props.quizzes.length === 0 && (
        <QuizDisplay variant={"newQuiz"} />
      )}
      {!props.isLoading
        ? props.quizzes.map((quiz, index) => (
            <div className={classes.reveal} key={index}>
              <QuizDisplay variant={"quiz"} quiz={quiz} />
            </div>
          ))
        : Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              <QuizDisplay variant={"loading"} />
            </div>
          ))}
    </div>
  );
};

export default QuizzesList;
