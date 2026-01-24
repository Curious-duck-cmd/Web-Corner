import { useState, useEffect } from 'react';
import { getCachedF1Data } from '../services/f1Api';

export const useF1Data = () => {
  const [seasonProgress, setSeasonProgress] = useState(0);
  const [nextRace, setNextRace] = useState(null);
  const [completedRaces, setCompletedRaces] = useState(0);
  const [totalRaces, setTotalRaces] = useState(24);
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchF1Data = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch real F1 data from API
        const f1Data = await getCachedF1Data();
        
        if (f1Data.apiSuccess) {
          // Set real data
          setDriverStandings(f1Data.driverStandings || []);
          setConstructorStandings(f1Data.constructorStandings || []);
          setCompletedRaces(f1Data.completedRaces || 0);
          setTotalRaces(f1Data.totalRaces || 24);
          setNextRace(f1Data.nextRace);
          setIsLive(true);
          
          console.log('✅ Live F1 data loaded successfully');
        } else {
          console.error('❌ Failed to load F1 data:', f1Data.error);
          setError(f1Data.error);
          setIsLive(false);
        }
        
        setLastUpdated(f1Data.lastUpdated);
        setLoading(false);
        
      } catch (err) {
        console.error('🚨 Error in F1 data fetch:', err);
        setError(err.message);
        setLoading(false);
        setIsLive(false);
      }
    };

    // Initial fetch
    fetchF1Data();
    
    // Refresh data every 5 minutes during race season
    const seasonInterval = setInterval(fetchF1Data, 5 * 60 * 1000);
    
    // Quick refresh every 30 seconds when close to race time
    const raceInterval = setInterval(fetchF1Data, 30 * 1000);
    
    // Cleanup function
    const cleanup = () => {
      clearInterval(seasonInterval);
      clearInterval(raceInterval);
    };
    
    return cleanup;
  }, []);

  // Calculate season progress
  useEffect(() => {
    const progress = totalRaces > 0 ? Math.round((completedRaces / totalRaces) * 100) : 0;
    setSeasonProgress(progress);
  }, [completedRaces, totalRaces]);

  return {
    seasonProgress,
    nextRace,
    completedRaces,
    totalRaces,
    driverStandings,
    constructorStandings,
    lastUpdated,
    loading,
    error,
    isLive,
    refreshData: async () => {
      console.log('🔄 Manual refresh triggered');
      const f1Data = await getCachedF1Data();
      if (f1Data.apiSuccess) {
        setDriverStandings(f1Data.driverStandings || []);
        setConstructorStandings(f1Data.constructorStandings || []);
        setCompletedRaces(f1Data.completedRaces || 0);
        setTotalRaces(f1Data.totalRaces || 24);
        setNextRace(f1Data.nextRace);
        setLastUpdated(f1Data.lastUpdated);
      }
    }
  };
};