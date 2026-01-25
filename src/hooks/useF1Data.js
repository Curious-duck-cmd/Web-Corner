// hooks/useF1Data.js - Ultra Optimized F1 Data Hook
import { useState, useEffect, useCallback } from 'react';
import { getF1Schedule, getF1Standings, getNextRace, clearCache, isValidCache } from '../services/f1Api';

export const useF1Data = () => {
  // State management with optimized initial values
  const [schedule, setSchedule] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [nextRace, setNextRace] = useState(null);
  const [seasonProgress, setSeasonProgress] = useState(0);
  const [completedRaces, setCompletedRaces] = useState(0);
  const [totalRaces, setTotalRaces] = useState(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Optimized data loading with memoization
  const loadF1Data = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🏎️ Loading F1 data...');
      
      // Parallel API calls for maximum performance
      const [scheduleData, standingsData, nextRaceData] = await Promise.all([
        getF1Schedule(),
        getF1Standings(),
        getNextRace()
      ]);

      // Update state in batch for better performance
      const updates = {};
      
      if (scheduleData.races?.length > 0) {
        updates.schedule = scheduleData.races;
        updates.totalRaces = scheduleData.totalRaces;
        
        // Calculate completed races
        const completed = scheduleData.races.filter(race => race.completed).length;
        updates.completedRaces = completed;
        updates.seasonProgress = Math.round((completed / scheduleData.totalRaces) * 100);
      }

      if (standingsData.driverStandings?.length > 0) {
        updates.driverStandings = standingsData.driverStandings;
        updates.constructorStandings = standingsData.constructorStandings;
        updates.isLive = true;
      }

      if (nextRaceData.nextRace) {
        updates.nextRace = {
          race: nextRaceData.nextRace.race || 'Australian Grand Prix',
          circuit: nextRaceData.nextRace.circuit || 'Albert Park Circuit',
          date: nextRaceData.nextRace.date || '2026-03-06',
          round: nextRaceData.nextRace.round || 1,
          country: nextRaceData.nextRace.country || '🇦🇺'
        };
      }

      updates.lastUpdated = new Date();
      updates.loading = false;

      // Batch state updates
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          switch (key) {
            case 'schedule': setSchedule(value); break;
            case 'totalRaces': setTotalRaces(value); break;
            case 'completedRaces': setCompletedRaces(value); break;
            case 'seasonProgress': setSeasonProgress(value); break;
            case 'driverStandings': setDriverStandings(value); break;
            case 'constructorStandings': setConstructorStandings(value); break;
            case 'nextRace': setNextRace(value); break;
            case 'isLive': setIsLive(value); break;
            case 'lastUpdated': setLastUpdated(value); break;
            case 'loading': setLoading(value); break;
          }
        }
      });

      console.log('✅ F1 data loaded successfully');
      
    } catch (err) {
      console.error('❌ F1 data loading failed:', err);
      setError(err.message);
      setIsLive(false);
      setSchedule([]);
      setDriverStandings([]);
      setConstructorStandings([]);
      setNextRace(null);
      setSeasonProgress(0);
      setCompletedRaces(0);
      setTotalRaces(24);
      setLastUpdated(new Date());
      setLoading(false);
    }
  }, []);

  // Optimized effect with proper dependencies
  useEffect(() => {
    loadF1Data();
  }, []);

  // Auto-refresh with smart intervals
  useEffect(() => {
    if (!isLive) return;

    const refreshInterval = isValidCache('standings') ? 5 * 60 * 1000 : 30 * 1000;
    const interval = setInterval(loadF1Data, refreshInterval);

    return () => clearInterval(interval);
  }, [isLive]);

  // Manual refresh with cache clearing
  const refreshData = useCallback(async () => {
    console.log('🔄 Manual refresh - clearing cache...');
    clearCache();
    await loadF1Data();
  }, []);

  return {
    // Data
    schedule,
    driverStandings,
    constructorStandings,
    nextRace,
    seasonProgress,
    completedRaces,
    totalRaces,
    
    // Status
    loading,
    error,
    isLive,
    lastUpdated,
    
    // Actions
    refreshData
  };
};