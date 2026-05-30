import { useEffect } from 'react';
import { useStore } from '../stores/lessonStore';
import { fetchLesson } from '../lib/api';

const useLesson = (topic, type) => {
  const { lesson, setLesson, resetLesson } = useStore();

  useEffect(() => {
    const loadLesson = async () => {
      const response = await fetchLesson(topic, type);
      if (response.ok) {
        setLesson(response.data);
      } else {
        resetLesson();
      }
    };

    loadLesson();
    
    return () => {
      resetLesson();
    };
  }, [topic, type, setLesson, resetLesson]);

  return lesson;
};

export default useLesson;