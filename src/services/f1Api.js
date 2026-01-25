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
    console.error('❌ Error fetching F1 data:', error);
    console.log('🔄 Falling back to mock data');
    
    // Fallback to mock data when API fails
    return getMock2026Data();
  }
};

// Fallback mock data for 2026 season
const getMock2026Data = () => {
  return {
    driverStandings: [
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
    ],
    constructorStandings: [
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
    ],
    completedRaces: 0,
    lastUpdated: new Date(),
    success: true,
    isFallback: true
  };
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
    console.error('❌ Error fetching next race:', error);
    console.log('🔄 Using fallback next race data');
    
    // Fallback next race data
    return {
      nextRace: {
        race: "Australian Grand Prix",
        circuit: "Albert Park Circuit", 
        date: "2026-03-06",
        round: 1,
        country: "🇦🇺"
      },
      totalRaces: 24,
      success: true,
      isFallback: true
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