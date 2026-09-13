import React, { useState } from 'react';
import { TOPICS } from '../../data/lessons';
import { useLearning } from '../../state/LearningContext';
import type { Difficulty, Preferences, Topic } from '../../types';

const SettingsPage: React.FC = () => {
  const { state, updatePreferences, resetProgress } = useLearning();
  const [draft, setDraft] = useState<Preferences>(state.preferences);
  const [saved, setSaved] = useState(false);

  const toggleTopic = (topic: Topic) => {
    setDraft((current) => ({
      ...current,
      focusTopics: current.focusTopics.includes(topic)
        ? current.focusTopics.filter((item) => item !== topic)
        : [...current.focusTopics, topic],
    }));
  };

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    updatePreferences({ ...draft, name: draft.name.trim() || 'Developer' });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="settings-page page-stack">
      <header className="page-heading"><div><p className="eyebrow">Preferences</p><h1>Make Dev Daily yours.</h1><p>Shape recommendations around the way you want to grow.</p></div></header>
      <form className="settings-grid" onSubmit={save}>
        <section className="panel settings-section">
          <div><p className="eyebrow">Profile</p><h2>Your learning space</h2></div>
          <label><span>Display name</span><input value={draft.name} maxLength={30} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></label>
          <label><span>Daily lesson goal</span><select value={draft.dailyGoal} onChange={(event) => setDraft({ ...draft, dailyGoal: Number(event.target.value) })}><option value={1}>1 lesson</option><option value={2}>2 lessons</option><option value={3}>3 lessons</option></select></label>
          <label><span>Difficulty</span><select value={draft.difficulty} onChange={(event) => setDraft({ ...draft, difficulty: event.target.value === 'adaptive' ? 'adaptive' : Number(event.target.value) as Difficulty })}><option value="adaptive">Adaptive</option><option value={1}>Foundations</option><option value={2}>Intermediate</option><option value={3}>Advanced</option></select></label>
        </section>
        <section className="panel settings-section">
          <div><p className="eyebrow">Focus areas</p><h2>Topics you care about</h2><p>Pick one or more to prioritize recommendations.</p></div>
          <div className="topic-select">
            {TOPICS.map((topic) => <button type="button" key={topic} className={draft.focusTopics.includes(topic) ? 'is-selected' : ''} onClick={() => toggleTopic(topic)}>{topic}<span>{draft.focusTopics.includes(topic) ? 'Selected' : 'Add'}</span></button>)}
          </div>
        </section>
        <section className="settings-actions">
          <button type="submit" className="button button-primary">Save preferences</button>
          {saved && <span className="save-note" role="status">Preferences saved.</span>}
        </section>
      </form>
      <section className="panel danger-zone"><div><h2>Reset learning progress</h2><p>Clear completions and streaks while keeping your preferences.</p></div><button type="button" className="button button-danger" onClick={() => window.confirm('Reset all learning progress? This cannot be undone.') && resetProgress()}>Reset progress</button></section>
    </div>
  );
};

export default SettingsPage;
