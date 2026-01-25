// hooks/useF1Data.js - Ultra Optimized F1 Data Hook
import { useState, useEffect, useCallback } from "react";
import {
  getF1Schedule,
  getF1Standings,
  getNextRace,
  getF1Drivers,
  clearCache,
  isValidCache,
} from "../services/f1Api";

// Import fallback data inline
const F1_FALLBACK_2026 = {
  schedule: [
    { round: 1, race: "Australian Grand Prix", circuit: "Albert Park Circuit", date: "2026-03-08", country: "🇦🇺" },
    { round: 2, race: "Chinese Grand Prix", circuit: "Shanghai International Circuit", date: "2026-03-15", country: "🇨🇳" },
    { round: 3, race: "Japanese Grand Prix", circuit: "Suzuka Circuit", date: "2026-03-29", country: "🇯🇵" },
    { round: 4, race: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", date: "2026-04-12", country: "🇧🇭" },
    { round: 5, race: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", date: "2026-04-19", country: "🇸🇦" },
    { round: 6, race: "Miami Grand Prix", circuit: "Miami International Autodrome", date: "2026-05-03", country: "🇺🇸" },
    { round: 7, race: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", date: "2026-05-24", country: "🇨🇦" },
    { round: 8, race: "Monaco Grand Prix", circuit: "Circuit de Monaco", date: "2026-06-07", country: "🇲🇨" },
    { round: 9, race: "Spanish Grand Prix", circuit: "Circuit de Barcelona-Catalunya", date: "2026-06-14", country: "🇪🇸" },
    { round: 10, race: "Austrian Grand Prix", circuit: "Red Bull Ring", date: "2026-06-28", country: "🇦🇹" },
    { round: 11, race: "British Grand Prix", circuit: "Silverstone Circuit", date: "2026-07-05", country: "🇬🇧" },
    { round: 12, race: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", date: "2026-07-19", country: "🇧🇪" },
    { round: 13, race: "Hungarian Grand Prix", circuit: "Hungaroring", date: "2026-07-26", country: "🇭🇺" },
    { round: 14, race: "Dutch Grand Prix", circuit: "Circuit Zandvoort", date: "2026-08-23", country: "🇳🇱" },
    { round: 15, race: "Italian Grand Prix", circuit: "Autodromo Nazionale di Monza", date: "2026-09-06", country: "🇮🇹" },
    { round: 16, race: "Madrid Grand Prix", circuit: "Circuit de Madrid", date: "2026-09-13", country: "🇪🇸" },
    { round: 17, race: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", date: "2026-09-26", country: "🇦🇿" },
    { round: 18, race: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", date: "2026-10-11", country: "🇸🇬" },
    { round: 19, race: "United States Grand Prix", circuit: "Circuit of the Americas", date: "2026-10-25", country: "🇺🇸" },
    { round: 20, race: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", date: "2026-11-01", country: "🇲🇽" },
    { round: 21, race: "Brazilian Grand Prix", circuit: "Autódromo José Carlos Pace", date: "2026-11-08", country: "🇧🇷" },
    { round: 22, race: "Las Vegas Grand Prix", circuit: "Las Vegas Street Circuit", date: "2026-11-21", country: "🇺🇸" },
    { round: 23, race: "Qatar Grand Prix", circuit: "Losail International Circuit", date: "2026-11-29", country: "🇶🇦" },
    { round: 24, race: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", date: "2026-12-06", country: "🇦🇪" }
  ],
  drivers: [
    { pos: 1, driver: "Lando Norris", team: "McLaren", points: 0, wins: 0, color: "#FF8700", driverId: "norris", constructorId: "mclaren" },
    { pos: 2, driver: "Oscar Piastri", team: "McLaren", points: 0, wins: 0, color: "#FF8700", driverId: "piastri", constructorId: "mclaren" },
    { pos: 3, driver: "Max Verstappen", team: "Red Bull Racing", points: 0, wins: 0, color: "#0600EF", driverId: "verstappen", constructorId: "red_bull" },
    { pos: 4, driver: "Isack Hadjar", team: "Red Bull Racing", points: 0, wins: 0, color: "#0600EF", driverId: "hadjar", constructorId: "red_bull" },
    { pos: 5, driver: "Charles Leclerc", team: "Ferrari", points: 0, wins: 0, color: "#DC0000", driverId: "leclerc", constructorId: "ferrari" },
    { pos: 6, driver: "Lewis Hamilton", team: "Ferrari", points: 0, wins: 0, color: "#DC0000", driverId: "hamilton", constructorId: "ferrari" },
    { pos: 7, driver: "George Russell", team: "Mercedes", points: 0, wins: 0, color: "#00D2BE", driverId: "russell", constructorId: "mercedes" },
    { pos: 8, driver: "Kimi Antonelli", team: "Mercedes", points: 0, wins: 0, color: "#00D2BE", driverId: "antonelli", constructorId: "mercedes" },
    { pos: 9, driver: "Fernando Alonso", team: "Aston Martin", points: 0, wins: 0, color: "#006F62", driverId: "alonso", constructorId: "aston_martin" },
    { pos: 10, driver: "Lance Stroll", team: "Aston Martin", points: 0, wins: 0, color: "#006F62", driverId: "stroll", constructorId: "aston_martin" },
    { pos: 11, driver: "Pierre Gasly", team: "Alpine", points: 0, wins: 0, color: "#0090FF", driverId: "gasly", constructorId: "alpine" },
    { pos: 12, driver: "Franco Colapinto", team: "Alpine", points: 0, wins: 0, color: "#0090FF", driverId: "colapinto", constructorId: "alpine" },
    { pos: 13, driver: "Alex Albon", team: "Williams", points: 0, wins: 0, color: "#005AFF", driverId: "albon", constructorId: "williams" },
    { pos: 14, driver: "Carlos Sainz", team: "Williams", points: 0, wins: 0, color: "#005AFF", driverId: "sainz", constructorId: "williams" },
    { pos: 15, driver: "Esteban Ocon", team: "Haas", points: 0, wins: 0, color: "#FFFFFF", driverId: "ocon", constructorId: "haas" },
    { pos: 16, driver: "Oliver Bearman", team: "Haas", points: 0, wins: 0, color: "#FFFFFF", driverId: "bearman", constructorId: "haas" },
    { pos: 17, driver: "Liam Lawson", team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562", driverId: "lawson", constructorId: "rbpt" },
    { pos: 18, driver: "Arvid Lindblad", team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562", driverId: "lindblad", constructorId: "rbpt" },
    { pos: 19, driver: "Nico Hülkenberg", team: "Audi", points: 0, wins: 0, color: "#C1002B", driverId: "hulkenberg", constructorId: "audi" },
    { pos: 20, driver: "Gabriel Bortoleto", team: "Audi", points: 0, wins: 0, color: "#C1002B", driverId: "bortoleto", constructorId: "audi" },
    { pos: 21, driver: "Sergio Pérez", team: "Cadillac", points: 0, wins: 0, color: "#FFD700", driverId: "perez", constructorId: "cadillac" },
    { pos: 22, driver: "Valtteri Bottas", team: "Cadillac", points: 0, wins: 0, color: "#FFD700", driverId: "bottas", constructorId: "cadillac" }
  ],
  constructors: [
    { pos: 1, team: "McLaren", points: 0, wins: 0, color: "#FF8700", constructorId: "mclaren" },
    { pos: 2, team: "Red Bull Racing", points: 0, wins: 0, color: "#0600EF", constructorId: "red_bull" },
    { pos: 3, team: "Ferrari", points: 0, wins: 0, color: "#DC0000", constructorId: "ferrari" },
    { pos: 4, team: "Mercedes", points: 0, wins: 0, color: "#00D2BE", constructorId: "mercedes" },
    { pos: 5, team: "Aston Martin", points: 0, wins: 0, color: "#006F62", constructorId: "aston_martin" },
    { pos: 6, team: "Alpine", points: 0, wins: 0, color: "#0090FF", constructorId: "alpine" },
    { pos: 7, team: "Williams", points: 0, wins: 0, color: "#005AFF", constructorId: "williams" },
    { pos: 8, team: "Haas", points: 0, wins: 0, color: "#FFFFFF", constructorId: "haas" },
    { pos: 9, team: "Racing Bulls", points: 0, wins: 0, color: "#2B4562", constructorId: "rbpt" },
    { pos: 10, team: "Audi", points: 0, wins: 0, color: "#C1002B", constructorId: "audi" },
    { pos: 11, team: "Cadillac", points: 0, wins: 0, color: "#FFD700", constructorId: "cadillac" }
  ]
};

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

  // Optimized data loading with memoization - Start with fallback data
  const loadF1Data = useCallback(async () => {
    setLoading(true);
    setError(null);

    // First load fallback data immediately to ensure site loads
    const fallbackSchedule = F1_FALLBACK_2026.schedule.map(race => ({
      ...race,
      race: race.race.replace(' Grand Prix', ''),
      completed: new Date(race.date) < new Date()
    }));
    
    const fallbackNextRace = fallbackSchedule.find(race => {
      const raceDate = new Date(race.date);
      return raceDate > new Date();
    }) || fallbackSchedule[0];

    const completed = fallbackSchedule.filter(race => race.completed).length;
    
    // Set fallback data immediately
    setSchedule(fallbackSchedule);
    setTotalRaces(fallbackSchedule.length);
    setCompletedRaces(completed);
    setSeasonProgress(Math.round((completed / fallbackSchedule.length) * 100));
    setDriverStandings(F1_FALLBACK_2026.drivers);
    setConstructorStandings(F1_FALLBACK_2026.constructors);
    setNextRace({
      race: fallbackNextRace.race || "Australian Grand Prix",
      circuit: fallbackNextRace.circuit || "Albert Park Circuit",
      date: fallbackNextRace.date || "2026-03-08",
      round: fallbackNextRace.round || 1,
      country: fallbackNextRace.country || "🇦🇺",
    });
    setIsLive(false);
    setLastUpdated(new Date());
    setLoading(false);

    // Then try to load live data in background
    try {
      console.log("🏎️ Loading 2026 F1 data with OpenF1 + Jolpica APIs...");

      // Parallel API calls for maximum performance
      const [scheduleData, standingsData, nextRaceData] = await Promise.all([
        getF1Schedule(),
        getF1Standings(),
        getNextRace(),
      ]);

      // Update state with live data if available
      if (scheduleData.races?.length > 0 && !scheduleData.cached) {
        setSchedule(scheduleData.races);
        setTotalRaces(scheduleData.totalRaces);
        
        const completed = scheduleData.races.filter(
          (race) => race.completed,
        ).length;
        setCompletedRaces(completed);
        setSeasonProgress(Math.round((completed / scheduleData.totalRaces) * 100));
      }

      if (standingsData.driverStandings?.length > 0 && !standingsData.cached) {
        setDriverStandings(standingsData.driverStandings);
        setConstructorStandings(standingsData.constructorStandings);
        setIsLive(true);
      }

      if (nextRaceData.nextRace && !nextRaceData.cached) {
        setNextRace({
          race: nextRaceData.nextRace.race || "Australian Grand Prix",
          circuit: nextRaceData.nextRace.circuit || "Albert Park Circuit",
          date: nextRaceData.nextRace.date || "2026-03-06",
          round: nextRaceData.nextRace.round || 1,
          country: nextRaceData.nextRace.country || "🇦🇺",
        });
      }

      console.log("✅ 2026 F1 data loaded successfully - Live APIs connected");
    } catch (err) {
      console.warn("⚠️ F1 live data failed, using fallback:", err.message);
      // Fallback data is already set, no need to do anything
    }
  }, []);

  // Optimized effect with proper dependencies
  useEffect(() => {
    loadF1Data();
  }, []);

  // Auto-refresh with smart intervals
  useEffect(() => {
    if (!isLive) return;

    const refreshInterval = isValidCache("standings")
      ? 5 * 60 * 1000
      : 30 * 1000;
    const interval = setInterval(loadF1Data, refreshInterval);

    return () => clearInterval(interval);
  }, [isLive]);

  // Manual refresh with cache clearing
  const refreshData = useCallback(async () => {
    console.log("🔄 Manual refresh - clearing cache...");
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
    refreshData,
  };
};
