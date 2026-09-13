import React from 'react';
import { Link } from 'react-router-dom';
import { LESSONS } from '../../data/lessons';
import { useLearning } from '../../state/LearningContext';

const Dashboard: React.FC = () => {
  const { state, completedToday } = useLearning();
  const completedIds = new Set(state.completions.map((item) => item.lessonId));
  const recommended = LESSONS.find(
    (lesson) => state.preferences.focusTopics.includes(lesson.topic) && !completedIds.has(lesson.id),
  ) ?? LESSONS.find((lesson) => !completedIds.has(lesson.id)) ?? LESSONS[0]!;
  const goalPercent = Math.min(100, (completedToday / state.preferences.dailyGoal) * 100);
  const accuracy = state.completions.length
    ? Math.round((state.completions.filter((item) => item.correct).length / state.completions.length) * 100)
    : 0;

  return (
    <div className="page-stack">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Your learning dashboard</p>
          <h1>Good to see you, {state.preferences.name}.</h1>
          <p>One focused concept today compounds into better code tomorrow.</p>
        </div>
        <Link to={`/lesson?id=${recommended.id}`} className="button button-primary">Start today&apos;s lesson <span>-&gt;</span></Link>
      </header>

      <section className="stat-grid" aria-label="Learning statistics">
        <article className="stat-card"><span>Current streak</span><strong>{state.currentStreak}</strong><small>days in a row</small></article>
        <article className="stat-card"><span>Lessons finished</span><strong>{state.completions.length}</strong><small>all time</small></article>
        <article className="stat-card"><span>Quiz accuracy</span><strong>{accuracy}%</strong><small>completed lessons</small></article>
        <article className="stat-card"><span>Personal best</span><strong>{state.longestStreak}</strong><small>day streak</small></article>
      </section>

      <div className="dashboard-grid">
        <section className="panel featured-lesson">
          <div className="section-heading"><div><p className="eyebrow">Recommended next</p><h2>{recommended.title}</h2></div><span className="topic-badge">{recommended.topic}</span></div>
          <p className="featured-summary">{recommended.summary}</p>
          <div className="lesson-meta"><span>{recommended.duration} min</span><span>Level {recommended.difficulty}</span><span>Lesson + quiz</span></div>
          <div className="code-window" aria-hidden="true"><div className="window-dots"><i /><i /><i /></div><pre>{recommended.code}</pre></div>
          <Link to={`/lesson?id=${recommended.id}`} className="button button-primary button-wide">Continue learning <span>-&gt;</span></Link>
        </section>

        <aside className="side-stack">
          <section className="panel daily-goal">
            <div className="section-heading"><div><p className="eyebrow">Daily goal</p><h2>{completedToday} of {state.preferences.dailyGoal} lessons</h2></div><strong>{Math.round(goalPercent)}%</strong></div>
            <div className="progress-track"><span style={{ width: `${goalPercent}%` }} /></div>
            <p>{completedToday >= state.preferences.dailyGoal ? 'Goal complete. Nice work.' : 'A few focused minutes is all it takes.'}</p>
          </section>
          <section className="panel topic-progress">
            <div className="section-heading"><div><p className="eyebrow">Skill map</p><h2>Topics in motion</h2></div><Link to="/settings">Edit</Link></div>
            {state.preferences.focusTopics.map((topic) => {
              const count = state.completions.filter((item) => item.topic === topic).length;
              return <div className="topic-row" key={topic}><span>{topic}</span><div className="mini-track"><i style={{ width: `${Math.min(100, count * 34)}%` }} /></div><strong>{count}</strong></div>;
            })}
          </section>
        </aside>
      </div>

      <section className="panel">
        <div className="section-heading"><div><p className="eyebrow">Lesson library</p><h2>Keep exploring</h2></div><Link to="/lesson">View all</Link></div>
        <div className="library-grid">
          {LESSONS.slice(0, 3).map((lesson) => {
            const done = completedIds.has(lesson.id);
            return (
              <Link to={`/lesson?id=${lesson.id}`} className="library-card" key={lesson.id}>
                <div><span className="topic-badge">{lesson.topic}</span>{done && <span className="complete-badge">Complete</span>}</div>
                <h3>{lesson.title}</h3><p>{lesson.summary}</p>
                <span className="text-link">{lesson.duration} min lesson <b>-&gt;</b></span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
