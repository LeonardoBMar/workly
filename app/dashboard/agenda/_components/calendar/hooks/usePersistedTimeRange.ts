'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_TIME_RANGE } from '../constants';

const STORAGE_KEY = 'agenda-time-range';

export function usePersistedTimeRange() {
  const [timeRange, setTimeRange] =
    useState<[number, number]>(DEFAULT_TIME_RANGE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 2) {
          setTimeRange(parsed as [number, number]);
        }
      } catch {}
    }
  }, []);

  const updateTimeRange = (val: [number, number]) => {
    setTimeRange(val);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  };

  return { timeRange, updateTimeRange } as const;
}
