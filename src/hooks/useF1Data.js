// hooks/useF1Data.js
// Custom React hook for F1 data with real API integration and fallback

import { useState, useEffect } from 'react';
import { getCachedF1Data } from '../services/f1Api';

export const useF1Data = () => {
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [nextRace, setNextRace] = useState(null);
  const [seasonProgress, setSeasonProgress] = useState(0);
  const [completedRaces, setCompletedRaces] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadF1Data = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🏎️ Fetching F1 data...');
      const data = await getCachedF1Data();

      if (data.apiSuccess) {
        console.log('✅ F1 API data loaded successfully');
        setIsLive(true);
      } else {
        console.log('⚠️ Using fallback F1 data');
        setIsLive(false);
      }

      // Set driver standings
      if (data.driverStandings && data.driverStandings.length > 0) {
        setDriverStandings(data.driverStandings);
      }

      // Set constructor standings
      if (data.constructorStandings && data.constructorStandings.length > 0) {
        setConstructorStandings(data.constructorStandings);
      }

      // Set next race info
      if (data.nextRace) {
        setNextRace({
          race: data.nextRace.race || data.nextRace.raceName || 'Australian Grand Prix',
          circuit: data.nextRace.circuit || data.nextRace.Circuit?.circuitName || 'Albert Park Circuit',
          date: data.nextRace.date || '2026-03-06T14:00:00',
          round: data.nextRace.round || 1,
          country: data.nextRace.country || '🇦🇺'
        });
      }

      // Calculate season progress
      const totalRaces = data.totalRaces || 24;
      const completed = data.completedRaces || 0;
      setCompletedRaces(completed);
      setSeasonProgress(Math.round((completed / totalRaces) * 100));

      setLastUpdated(new Date());
      setLoading(false);

    } catch (err) {
      console.error('❌ Error in useF1Data:', err);
      setError(err.message);
      setIsLive(false);
      setLoading(false);
      
      // Set fallback data on error
      setFallbackData();
    }
  };

  const setFallbackData = () => {
    console.log('📦 Loading fallback F1 data...');
    
    setNextRace({
      race: 'Australian Grand Prix',
      circuit: 'Albert Park Circuit',
      date: '2026-03-06T14:00:00',
      round: 1,
      country: '🇦🇺'
    });

    setDriverStandings([
      { pos: 1, driver: "Max Verstappen", team: "Red Bull Racing", points: 0, wins: 0, color: "#0600EF" },
      { pos: 2, driver: "Lando Norris", team: "McLaren", points: 0, wins: 0, color: "#FF8700" },
      { pos: 3, driver: "Charles Leclerc", team: "Ferrari", points: 0, wins: 0, color: "#DC0000" },
      { pos: 4, driver: "Lewis Hamilton", team: "Ferrari", points: 0, wins: 0, color: "#DC0000" },
      { pos: 5, driver: "Oscar Piastri", team: "McLaren", points: 0, wins: 0, color: "#FF8700" },
      { pos: 6, driver: "George Russell", team: "Mercedes", points: 0, wins: 0, color: "#00D2BE" },
      { pos: 7, driver: "Kimi Antonelli", team: "Mercedes", points: 0, wins: 0, color: "#00D2BE" },
      { pos: 8, driver: "Carlos Sainz", team: "Williams", points: 0, wins: 0, color: "#005AFF" },
      { pos: 9, driver: "Fernando Alonso", team: "Aston Martin", points: 0, wins: 0, color: "#006F62" },
      { pos: 10, driver: "Lance Stroll", team: "Aston Martin", points: 0, wins: 0, color: "#006F62" },
      { pos: 11, driver: "Valtteri Bottas", team: "Kick Sauber", points: 0, wins: 0, color: "#52E252" },
      { pos: 12, driver: "Zhou Guanyu", team: "Kick Sauber", points: 0, wins: 0, color: "#52E252" },
      { pos: 13, driver: "Nico Hülkenberg", team: "Haas", points: 0, wins: 0, color: "#FFFFFF" },
      { pos: 14, driver: "Oliver Bearman", team: "Haas", points: 0, wins: 0, color: "#FFFFFF" },
      { pos: 15, driver: "Pierre Gasly", team: "Alpine", points: 0, wins: 0, color: "#0090FF" },
      { pos: 16, driver: "Jack Doohan", team: "Alpine", points: 0, wins: 0, color: "#0090FF" },
      { pos: 17, driver: "Yuki Tsunoda", team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562" },
      { pos: 18, driver: "Liam Lawson", team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562" },
      { pos: 19, driver: "Franco Colapinto", team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562" },
      { pos: 20, driver: "Esteban Ocon", team: "Alpine", points: 0, wins: 0, color: "#0090FF" }
    ]);

    setConstructorStandings([
      { pos: 1, team: "Red Bull Racing", points: 0, wins: 0, color: "#0600EF" },
      { pos: 2, team: "McLaren", points: 0, wins: 0, color: "#FF8700" },
      { pos: 3, team: "Ferrari", points: 0, wins: 0, color: "#DC0000" },
      { pos: 4, team: "Mercedes", points: 0, wins: 0, color: "#00D2BE" },
      { pos: 5, team: "Aston Martin", points: 0, wins: 0, color: "#006F62" },
      { pos: 6, team: "Alpine", points: 0, wins: 0, color: "#0090FF" },
      { pos: 7, team: "Williams", points: 0, wins: 0, color: "#005AFF" },
      { pos: 8, team: "Haas", points: 0, wins: 0, color: "#FFFFFF" },
      { pos: 9, team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562" },
      { pos: 10, team: "Kick Sauber (Cadillac)", points: 0, wins: 0, color: "#52E252" },
      { pos: 11, team: "Audi", points: 0, wins: 0, color: "#C1002B" }
    ]);

    setCompletedRaces(0);
    setSeasonProgress(0);
    setLastUpdated(new Date());
  };

  const refreshData = () => {
    console.log('🔄 Manually refreshing F1 data...');
    loadF1Data();
  };

  // Load data on mount
  useEffect(() => {
    loadF1Data();

    // Auto-refresh every 5 minutes if data is live
    const interval = setInterval(() => {
      if (isLive) {
        console.log('🔄 Auto-refreshing F1 data...');
        loadF1Data();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isLive]);

  return {
    driverStandings,
    constructorStandings,
    nextRace,
    seasonProgress,
    completedRaces,
    loading,
    error,
    isLive,
    lastUpdated,
    refreshData
  };
};