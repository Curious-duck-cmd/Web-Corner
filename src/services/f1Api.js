// F1 API Service using Ergast API (free, no API key required)

const API_BASE_URL = 'https://ergast.com/api/f1';

// Get current season data
export const getCurrentSeasonStandings = async () => {
  try {
    const currentYear = new Date().getFullYear();
    
    // Get driver standings
    const driverResponse = await fetch(`${API_BASE_URL}/${currentYear}/driverStandings.json`);
    const driverData = await driverResponse.json();
    
    // Get constructor standings  
    const constructorResponse = await fetch(`${API_BASE_URL}/${currentYear}/constructorStandings.json`);
    const constructorData = await constructorResponse.json();
    
    // Get race results for completed races
    const racesResponse = await fetch(`${API_BASE_URL}/${currentYear}/results.json`);
    const racesData = await racesResponse.json();
    
    // Process and return data
    const driverStandings = processDriverStandings(driverData);
    const constructorStandings = processConstructorStandings(constructorData);
    const completedRaces = racesData.MRData.RaceTable?.Races?.length || 0;
    
    return {
      driverStandings,
      constructorStandings,
      completedRaces,
      lastUpdated: new Date(),
      success: true
    };
    
  } catch (error) {
    console.error('Error fetching F1 data:', error);
    return {
      driverStandings: [],
      constructorStandings: [],
      completedRaces: 0,
      lastUpdated: new Date(),
      success: false,
      error: error.message
    };
  }
};

// Get next race information
export const getNextRace = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(`${API_BASE_URL}/${currentYear}.json`);
    const data = await response.json();
    
    const races = data.MRData.RaceTable?.Races || [];
    const now = new Date();
    
    // Find next upcoming race
    const nextRace = races.find(race => {
      const raceDate = new Date(race.date + 'T' + (race.time || '12:00:00'));
      return raceDate > now;
    });
    
    return {
      nextRace: nextRace || null,
      totalRaces: races.length,
      success: true
    };
    
  } catch (error) {
    console.error('Error fetching next race:', error);
    return {
      nextRace: null,
      totalRaces: 0,
      success: false,
      error: error.message
    };
  }
};

// Process driver standings data
const processDriverStandings = (data) => {
  const standings = data.MRData.StandingsTable[0]?.DriverStandings || [];
  
  return standings.map((driver, index) => ({
    pos: index + 1,
    driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
    team: driver.Constructors[0]?.name || 'Unknown',
    points: parseInt(driver.points) || 0,
    wins: parseInt(driver.wins) || 0,
    color: getTeamColor(driver.Constructors[0]?.constructorId),
    driverId: driver.Driver.driverId,
    constructorId: driver.Constructors[0]?.constructorId
  }));
};

// Process constructor standings data
const processConstructorStandings = (data) => {
  const standings = data.MRData.StandingsTable[0]?.ConstructorStandings || [];
  
  return standings.map((team, index) => ({
    pos: index + 1,
    team: team.Constructor.name,
    points: parseInt(team.points) || 0,
    wins: parseInt(team.wins) || 0,
    color: getTeamColor(team.Constructor.constructorId),
    constructorId: team.Constructor.constructorId
  }));
};

// Team color mapping for F1 teams
const getTeamColor = (constructorId) => {
  const teamColors = {
    // Current 2026 teams
    'red_bull': '#0600EF',
    'mclaren': '#FF8700', 
    'ferrari': '#DC0000',
    'mercedes': '#00D2BE',
    'aston_martin': '#006F62',
    'alpine': '#0090FF',
    'williams': '#005AFF',
    'haas': '#FFFFFF',
    'rbpt': '#2B4562', // Racing Bulls
    'audi': '#C1002B',
    'sauber': '#52E252', // Kick Sauber/Cadillac
    'kick_sauber': '#52E252',
    
    // Legacy teams for compatibility
    'renault': '#FFF500',
    'toro_rosso': '#469BFF',
    'force_india': '#F596C8',
    'lotus': '#FFB81C',
    'manor': '#6D3F8F',
    
    // Default
    'default': '#888888'
  };
  
  return teamColors[constructorId] || teamColors['default'];
};

// Get race schedule for current season
export const getRaceSchedule = async () => {
  try {
    const currentYear = new Date().getFullYear();
    const response = await fetch(`${API_BASE_URL}/${currentYear}.json`);
    const data = await response.json();
    
    const races = data.MRData.RaceTable?.Races || [];
    
    return {
      races: races.map(race => ({
        round: parseInt(race.round),
        race: race.raceName?.replace('Grand Prix', ''),
        circuit: race.Circuit?.circuitName || 'Unknown Circuit',
        date: race.date,
        country: getCountryFlag(race.Circuit?.Location?.country),
        time: race.time,
        completed: new Date(race.date + 'T' + (race.time || '12:00:00')) < new Date()
      })),
      success: true
    };
    
  } catch (error) {
    console.error('Error fetching race schedule:', error);
    return {
      races: [],
      success: false,
      error: error.message
    };
  }
};

// Get country flag emojis
const getCountryFlag = (country) => {
  const flagMap = {
    'Australia': '🇦🇺',
    'China': '🇨🇳', 
    'Japan': '🇯🇵',
    'Bahrain': '🇧🇭',
    'Saudi Arabia': '🇸🇦',
    'USA': '🇺🇸',
    'Canada': '🇨🇦',
    'Monaco': '🇲🇨',
    'Spain': '🇪🇸',
    'Austria': '🇦🇹',
    'UK': '🇬🇧',
    'Belgium': '🇧🇪',
    'Hungary': '🇭🇺',
    'Netherlands': '🇳🇱',
    'Italy': '🇮🇹',
    'Azerbaijan': '🇦🇿',
    'Singapore': '🇸🇬',
    'Mexico': '🇲🇽',
    'Brazil': '🇧🇷',
    'Qatar': '🇶🇦',
    'UAE': '🇦🇪'
  };
  
  return flagMap[country] || '🏁';
};

// Cache data to avoid excessive API calls
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedF1Data = async () => {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedData && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return { ...cachedData, cached: true };
  }
  
  // Fetch fresh data
  const [standings, nextRace, schedule] = await Promise.all([
    getCurrentSeasonStandings(),
    getNextRace(),
    getRaceSchedule()
  ]);
  
  // Update cache
  cachedData = {
    ...standings,
    ...nextRace,
    ...schedule,
    apiSuccess: standings.success && nextRace.success && schedule.success
  };
  cacheTimestamp = now;
  
  return { ...cachedData, cached: false };
};