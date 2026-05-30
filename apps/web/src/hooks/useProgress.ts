import { useEffect } from 'react';
import { useStore } from '../stores/sessionStore';
import { useSkillProfileStore } from '../stores/skillProfileStore';

const useProgress = () => {
  const { sessions, addSession } = useStore();
  const { skillProfile, updateSkillProfile } = useSkillProfileStore();

  const calculateProgress = () => {
    const completedSessions = sessions.filter(session => session.status === 'completed');
    const totalSessions = sessions.length;
    const progress = totalSessions > 0 ? (completedSessions.length / totalSessions) * 100 : 0;

    return {
      progress,
      completedCount: completedSessions.length,
      totalCount: totalSessions,
    };
  };

  const updateSkillLevel = (session) => {
    const { topic, difficulty } = session;
    const currentProfile = skillProfile.topic[topic] || { level: 1, completedCount: 0, correctCount: 0 };

    currentProfile.completedCount += 1;
    if (session.status === 'completed') {
      currentProfile.correctCount += 1;
    }

    const newLevel = currentProfile.correctCount / currentProfile.completedCount >= 0.7 ? Math.min(currentProfile.level + 1, 3) : Math.max(currentProfile.level - 1, 1);
    updateSkillProfile({ ...skillProfile, topic: { ...skillProfile.topic, [topic]: { ...currentProfile, level: newLevel } } });
  };

  useEffect(() => {
    sessions.forEach(session => {
      if (session.status === 'completed') {
        updateSkillLevel(session);
      }
    });
  }, [sessions]);

  return {
    progress: calculateProgress(),
    addSession,
  };
};

export default useProgress;