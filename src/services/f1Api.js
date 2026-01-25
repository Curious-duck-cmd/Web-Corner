// F1 API Service - Ultra Optimized
const API_BASE_URL = 'https://ergast.com/api/f1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Performance cache
let cache = {
  schedule: null,
  standings: null,
  nextRace: null,
  timestamp: null
};

const isValidCache = (type) => {
  return cache[type] && cache.timestamp && 
    (Date.now() - cache.timestamp) < CACHE_DURATION;
};

const setCache = (type, data) => {
  cache[type] = data;
  cache.timestamp = Date.now();
};

const clearCache = () => {
  cache = { schedule: null, standings: null, nextRace: null, timestamp: null };
};

// Optimized API calls with better error handling
const apiCall = async (endpoint, errorMessage) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'F1-Portfolio/1.0'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    console.error(`F1 API Error (${endpoint}):`, error);
    throw new Error(errorMessage);
  }
};

// Schedule API
export const getF1Schedule = async () => {
  if (isValidCache('schedule')) {
    return { ...cache.schedule, cached: true };
  }

  const data = await apiCall('current.json', 'Failed to fetch race schedule');
  const races = data.MRData?.RaceTable?.Races || [];
  
  const schedule = races.map(race => ({
    round: parseInt(race.round),
    race: race.raceName?.replace('Grand Prix', ''),
    circuit: race.Circuit?.circuitName || 'Unknown Circuit',
    date: race.date,
    country: getCountryFlag(race.Circuit?.Location?.country),
    time: race.time,
    completed: new Date(race.date + 'T' + (race.time || '12:00:00')) < new Date()
  }));

  setCache('schedule', { races: schedule, totalRaces: races.length });
  return { ...cache.schedule, cached: false };
};

// Standings API
export const getF1Standings = async () => {
  if (isValidCache('standings')) {
    return { ...cache.standings, cached: true };
  }

  // Parallel requests for better performance
  const [driverData, constructorData] = await Promise.all([
    apiCall('current/driverStandings.json', 'Failed to fetch driver standings'),
    apiCall('current/constructorStandings.json', 'Failed to fetch constructor standings')
  ]);

  const driverStandings = driverData.MRData?.StandingsTable?.[0]?.DriverStandings || [];
  const constructorStandings = constructorData.MRData?.StandingsTable?.[0]?.ConstructorStandings || [];
  
  const processedData = {
    driverStandings: driverStandings.map((driver, index) => ({
      pos: index + 1,
      driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      team: driver.Constructors?.[0]?.name || 'Unknown',
      points: parseInt(driver.points) || 0,
      wins: parseInt(driver.wins) || 0,
      color: getTeamColor(driver.Constructors?.[0]?.constructorId),
      driverId: driver.Driver.driverId,
      constructorId: driver.Constructors?.[0]?.constructorId
    })),
    constructorStandings: constructorStandings.map((team, index) => ({
      pos: index + 1,
      team: team.Constructor.name,
      points: parseInt(team.points) || 0,
      wins: parseInt(team.wins) || 0,
      color: getTeamColor(team.Constructor.constructorId),
      constructorId: team.Constructor.constructorId
    }))
  };

  setCache('standings', {
    ...processedData,
    lastUpdated: new Date(),
    apiSuccess: true
  });

  return { ...cache.standings, cached: false };
};

// Next race API
export const getNextRace = async () => {
  if (isValidCache('nextRace')) {
    return { ...cache.nextRace, cached: true };
  }

  const data = await apiCall('current.json', 'Failed to fetch next race');
  const races = data.MRData?.RaceTable?.Races || [];
  const now = new Date();
  
  const nextRace = races.find(race => {
    const raceDate = new Date(race.date + 'T' + (race.time || '12:00:00'));
    return raceDate > now;
  });

  const result = {
    nextRace: nextRace || null,
    totalRaces: races.length,
    success: true
  };

  setCache('nextRace', result);
  return { ...cache.nextRace, cached: false };
};

// Utility functions
const getTeamColor = (constructorId) => {
  const colors = {
    red_bull: '#0600EF', mclaren: '#FF8700', ferrari: '#DC0000',
    mercedes: '#00D2BE', aston_martin: '#006F62', alpine: '#0090FF',
    williams: '#005AFF', haas: '#FFFFFF', rbpt: '#2B4562',
    audi: '#C1002B', sauber: '#52E252', kick_sauber: '#52E252',
    default: '#888888'
  };
  
  return colors[constructorId] || colors.default;
};

const getCountryFlag = (country) => {
  const flags = {
    Australia: '🇦🇺', China: '🇨🇳', Japan: '🇯🇵',
    Bahrain: '🇧🇭', 'Saudi Arabia': '🇸🇦', USA: '🇺🇸',
    Canada: '🇨🇦', Monaco: '🇲🇨', Spain: '🇪🇸',
    Austria: '🇦🇹', UK: '🇬🇧', Belgium: '🇧🇪',
    Hungary: '🇭🇺', Netherlands: '🇳🇱', Italy: '🇮🇹',
    Azerbaijan: '🇦🇿', Singapore: '🇸🇬', Mexico: '🇲🇽',
    Brazil: '🇧🇷', Qatar: '🇶🇦', UAE: '🇦🇪'
  };
  
  return flags[country] || '🏁';
};

export { clearCache, isValidCache };