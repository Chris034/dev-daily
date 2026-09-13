import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getLesson, LESSONS, TOPICS } from '../../data/lessons';
import { useLearning } from '../../state/LearningContext';

const LessonPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lesson = getLesson(searchParams.get('id'));
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { state, completeLesson } = useLearning();
  const isComplete = state.completions.some((item) => item.lessonId === lesson.id);
  const isCorrect = selectedAnswer === lesson.answer;

  const chooseLesson = (id: string) => {
    setSelectedAnswer(null);
    setSubmitted(false);
    setSearchParams({ id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = () => {
    if (!selectedAnswer) return;
    setSubmitted(true);
    completeLesson(lesson.id, lesson.topic, isCorrect);
  };

  return (
    <div className="lesson-layout">
      <aside className="lesson-browser">
        <p className="eyebrow">Lesson library</p>
        <h2>Choose a concept</h2>
        <div className="topic-filter">{TOPICS.map((topic) => <span key={topic}>{topic}</span>)}</div>
        <div className="lesson-list">
          {LESSONS.map((item) => (
            <button
              type="button"
              className={`${item.id === lesson.id ? 'is-active' : ''} ${state.completions.some((completion) => completion.lessonId === item.id) ? 'is-complete' : ''}`}
              onClick={() => chooseLesson(item.id)}
              key={item.id}
            >
              <span>{item.topic} / {item.duration} min</span>
              <strong>{item.title}</strong>
              {state.completions.some((completion) => completion.lessonId === item.id) && <i aria-label="Completed">Done</i>}
            </button>
          ))}
        </div>
      </aside>

      <article className="lesson-content">
        <div className="lesson-hero">
          <div><span className="topic-badge">{lesson.topic}</span>{isComplete && <span className="complete-badge">Completed</span>}</div>
          <h1>{lesson.title}</h1><p>{lesson.summary}</p>
          <div className="lesson-meta"><span>{lesson.duration} minutes</span><span>Level {lesson.difficulty}</span></div>
        </div>
        <section className="lesson-section"><p className="step-label">01 / Concept</p><h2>{lesson.concept}</h2>{lesson.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        <section className="lesson-section"><p className="step-label">02 / Example</p><div className="code-window"><div className="code-header"><span>{lesson.language}</span><span>example</span></div><pre><code>{lesson.code}</code></pre></div></section>
        <section className="lesson-section challenge-box"><p className="step-label">03 / Try it</p><h2>Quick challenge</h2><p>{lesson.challenge}</p></section>
        <section className="lesson-section quiz-section">
          <p className="step-label">04 / Check your understanding</p><h2>{lesson.question}</h2>
          <div className="quiz-options">
            {lesson.options.map((option) => (
              <button
                type="button"
                key={option.id}
                className={`${selectedAnswer === option.id ? 'is-selected' : ''} ${submitted && option.id === lesson.answer ? 'is-correct' : ''} ${submitted && selectedAnswer === option.id && !isCorrect ? 'is-wrong' : ''}`}
                onClick={() => !submitted && setSelectedAnswer(option.id)}
              ><span>{option.id.toUpperCase()}</span>{option.label}</button>
            ))}
          </div>
          {!submitted ? (
            <button type="button" className="button button-primary" disabled={!selectedAnswer} onClick={submit}>Check answer</button>
          ) : (
            <div className={`feedback ${isCorrect ? 'success' : 'retry'}`}>
              <strong>{isCorrect ? 'Exactly right.' : 'Not quite, but the lesson still counts.'}</strong>
              <p>{lesson.takeaway}</p>
              <Link to="/" className="text-link">Back to dashboard -&gt;</Link>
            </div>
          )}
        </section>
      </article>
    </div>
  );
};

export default LessonPage;
