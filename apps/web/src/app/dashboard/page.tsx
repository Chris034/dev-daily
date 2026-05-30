import React from 'react';
import { useEffect, useMemo, useState } from 'react';

type QuestCategory = 'Food' | 'Travel' | 'Seasonal' | 'Romantic';

type Quest = {
  id: string;
  category: QuestCategory;
  title: string;
  detail: string;
};

const STORAGE_KEY = 'adventure_mvp_state_v1';

const QUESTS: Quest[] = [
  { id: 'q1', category: 'Food', title: 'Sunrise Coffee Hunt', detail: 'Find a local cafe before 9 AM and try the house specialty.' },
  { id: 'q2', category: 'Food', title: 'Street Bite Passport', detail: 'Taste one new street food and rate it in your notes.' },
  { id: 'q3', category: 'Travel', title: 'Hidden Viewpoint', detail: 'Walk to a viewpoint that is not in your usual route.' },
  { id: 'q4', category: 'Travel', title: 'Two-Mile Drift', detail: 'Take a map-free stroll and capture one unexpected moment.' },
  { id: 'q5', category: 'Seasonal', title: 'Weather Window', detail: 'Do one activity that matches today\'s season.' },
  { id: 'q6', category: 'Seasonal', title: 'Golden Hour Checkpoint', detail: 'Step outside at golden hour and take one photo.' },
  { id: 'q7', category: 'Romantic', title: 'Sunset Promise', detail: 'Plan a calm sunset stop with a person you care about.' },
  { id: 'q8', category: 'Romantic', title: 'Quiet Dinner Route', detail: 'Choose a cozy meal spot and leave a short memory note.' },
];

const CATEGORIES: QuestCategory[] = ['Food', 'Travel', 'Seasonal', 'Romantic'];

const BADGES = [
  { id: 'b1', title: 'First Step', requirement: 1 },
  { id: 'b2', title: 'Trail Runner', requirement: 3 },
  { id: 'b3', title: 'Pathfinder', requirement: 6 },
];

type StoredState = {
  selectedCategory: QuestCategory;
  completedQuestIds: string[];
  uploadedPhotoDataUrl: string | null;
};

const getInitialState = (): StoredState => {
  const fallback: StoredState = {
    selectedCategory: 'Travel',
    completedQuestIds: [],
    uploadedPhotoDataUrl: null,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw) as StoredState;

    if (!parsed.selectedCategory || !Array.isArray(parsed.completedQuestIds)) {
      return fallback;
    }

    return parsed;
  } catch {
    return fallback;
  }
};

const Dashboard: React.FC = () => {
  const initial = getInitialState();
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory>(initial.selectedCategory);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(initial.completedQuestIds);
  const [uploadedPhotoDataUrl, setUploadedPhotoDataUrl] = useState<string | null>(initial.uploadedPhotoDataUrl);

  useEffect(() => {
    const nextState: StoredState = {
      selectedCategory,
      completedQuestIds,
      uploadedPhotoDataUrl,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }, [selectedCategory, completedQuestIds, uploadedPhotoDataUrl]);

  const filteredQuests = useMemo(
    () => QUESTS.filter((quest) => quest.category === selectedCategory),
    [selectedCategory]
  );

  const totalCount = QUESTS.length;
  const completedCount = completedQuestIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleQuest = (questId: string) => {
    setCompletedQuestIds((previous) =>
      previous.includes(questId) ? previous.filter((id) => id !== questId) : [...previous, questId]
    );
  };

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const value = typeof reader.result === 'string' ? reader.result : null;
      setUploadedPhotoDataUrl(value);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="adventure-page">
      <article className="hero-card">
        <p className="hero-eyebrow">Adventure Planner</p>
        <h2 className="hero-title">Build your next meaningful day</h2>
        <p className="hero-copy">Choose a quest, complete it, and keep your progress alive across sessions.</p>
        <div className="hero-progress-row">
          <span>{completedCount} of {totalCount} quests complete</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="hero-progress-track" role="presentation">
          <div className="hero-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </article>

      <article className="card-block">
        <div className="card-heading-row">
          <h3>Adventure Memory</h3>
          <label className="upload-button" htmlFor="photo-upload">Upload Photo</label>
          <input id="photo-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden-upload" />
        </div>
        {uploadedPhotoDataUrl ? (
          <img src={uploadedPhotoDataUrl} alt="Uploaded adventure memory" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">Add a real photo from your device to personalize your quests.</div>
        )}
      </article>

      <article className="card-block">
        <h3>Quest Categories</h3>
        <div className="pill-row">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`category-pill ${selectedCategory === category ? 'is-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </article>

      <article className="card-block">
        <h3>{selectedCategory} Quests</h3>
        <div className="quest-list">
          {filteredQuests.map((quest) => {
            const isCompleted = completedQuestIds.includes(quest.id);

            return (
              <div key={quest.id} className="quest-card">
                <div>
                  <h4>{quest.title}</h4>
                  <p>{quest.detail}</p>
                </div>
                <button
                  type="button"
                  className={`quest-toggle ${isCompleted ? 'is-complete' : ''}`}
                  onClick={() => toggleQuest(quest.id)}
                >
                  {isCompleted ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
            );
          })}
        </div>
      </article>

      <article className="card-block">
        <h3>Achievement Badges</h3>
        <div className="badge-row">
          {BADGES.map((badge) => {
            const unlocked = completedCount >= badge.requirement;

            return (
              <div key={badge.id} className={`badge-chip ${unlocked ? 'is-unlocked' : ''}`}>
                <span className="badge-title">{badge.title}</span>
                <span className="badge-rule">Complete {badge.requirement} quests</span>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default Dashboard;