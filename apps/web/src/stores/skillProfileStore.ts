import create from 'zustand';

type SkillProfile = {
  topic: Record<string, { level: 1 | 2 | 3; completedCount: number; correctCount: number }>;
  globalPreference: 'auto' | 1 | 2 | 3; // manual override
};

type SkillProfileStore = {
  skillProfile: SkillProfile;
  setSkillProfile: (profile: SkillProfile) => void;
  updateTopicLevel: (topic: string, level: 1 | 2 | 3) => void;
  incrementCompletedCount: (topic: string) => void;
  incrementCorrectCount: (topic: string) => void;
};

const useSkillProfileStore = create<SkillProfileStore>((set) => ({
  skillProfile: {
    topic: {},
    globalPreference: 'auto',
  },
  setSkillProfile: (profile) => set({ skillProfile: profile }),
  updateTopicLevel: (topic, level) => set((state) => ({
    skillProfile: {
      ...state.skillProfile,
      topic: {
        ...state.skillProfile.topic,
        [topic]: {
          ...state.skillProfile.topic[topic],
          level,
        },
      },
    },
  })),
  incrementCompletedCount: (topic) => set((state) => ({
    skillProfile: {
      ...state.skillProfile,
      topic: {
        ...state.skillProfile.topic,
        [topic]: {
          ...state.skillProfile.topic[topic],
          completedCount: (state.skillProfile.topic[topic]?.completedCount || 0) + 1,
        },
      },
    },
  })),
  incrementCorrectCount: (topic) => set((state) => ({
    skillProfile: {
      ...state.skillProfile,
      topic: {
        ...state.skillProfile.topic,
        [topic]: {
          ...state.skillProfile.topic[topic],
          correctCount: (state.skillProfile.topic[topic]?.correctCount || 0) + 1,
        },
      },
    },
  })),
}));

export default useSkillProfileStore;