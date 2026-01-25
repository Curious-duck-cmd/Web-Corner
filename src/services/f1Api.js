// F1 API Service - 2026 Season with OpenF1 + Jolpica
const OPENF1_API = 'https://api.openf1.org/v1';
const JOLPICA_API = 'https://api.jolpi.ca/ergast/f1';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Performance cache
let cache = {
  schedule: null,
  standings: null,
  nextRace: null,
  drivers: null,
  timestamp: null
};

// Fallback data for 2026 if API fails
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
const apiCall = async (url, errorMessage) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(url, {
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
    console.error(`API Error (${url}):`, error);
    throw new Error(errorMessage);
  }
};

// Schedule API - OpenF1 2026 Calendar
export const getF1Schedule = async () => {
  if (isValidCache('schedule')) {
    return { ...cache.schedule, cached: true };
  }

  try {
    // Get 2026 calendar from OpenF1
    const meetings = await apiCall(`${OPENF1_API}/meetings?year=2026`, 'Failed to fetch 2026 calendar');
    
    if (meetings && meetings.length > 0) {
      const races = meetings
        .filter(meeting => meeting.meeting_official_name && meeting.meeting_official_name.includes('Grand Prix'))
        .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
        .map((meeting, index) => ({
          round: index + 1,
          race: meeting.meeting_official_name.replace('Grand Prix', '').trim(),
          circuit: meeting.location || 'Unknown Circuit',
          date: meeting.date_start.split('T')[0],
          country: getCountryFlag(meeting.country_name) || '🏁',
          completed: new Date(meeting.date_start) < new Date(),
          location: meeting.location,
          country_name: meeting.country_name
        }));

      setCache('schedule', { races: races, totalRaces: races.length });
      return { ...cache.schedule, cached: false };
    }
  } catch (error) {
    console.warn('OpenF1 calendar failed, using fallback:', error);
  }

  // Fallback to static 2026 data
  const races = F1_FALLBACK_2026.schedule.map(race => ({
    ...race,
    race: race.race.replace(' Grand Prix', ''),
    completed: new Date(race.date) < new Date()
  }));

  setCache('schedule', { races: races, totalRaces: races.length });
  return { ...cache.schedule, cached: false };
};

// Drivers API - OpenF1 Live Driver Data
export const getF1Drivers = async () => {
  if (isValidCache('drivers')) {
    return { ...cache.drivers, cached: true };
  }

  try {
    // Get latest drivers from OpenF1
    const drivers = await apiCall(`${OPENF1_API}/drivers?session_key=latest`, 'Failed to fetch driver data');
    
    if (drivers && drivers.length > 0) {
      const processedDrivers = drivers.map((driver, index) => ({
        pos: index + 1,
        driver: driver.full_name || driver.name_acronym,
        team: driver.team_name || 'Unknown Team',
        points: 0, // Will be updated from standings API
        wins: 0, // Will be updated from standings API
        color: driver.team_colour ? `#${driver.team_colour}` : '#888888',
        driverId: driver.name_acronym?.toLowerCase() || `driver${index}`,
        constructorId: driver.team_name?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
        driver_number: driver.driver_number
      }));

      setCache('drivers', { drivers: processedDrivers });
      return { ...cache.drivers, cached: false };
    }
  } catch (error) {
    console.warn('OpenF1 drivers failed, using fallback:', error);
  }

  // Fallback to static data
  setCache('drivers', { drivers: F1_FALLBACK_2026.drivers });
  return { ...cache.drivers, cached: false };
};

// Standings API - 2026 Season Data
export const getF1Standings = async () => {
  if (isValidCache('standings')) {
    return { ...cache.standings, cached: true };
  }

  // Use 2026 season data
  const processedData = {
    driverStandings: F1_FALLBACK_2026.drivers,
    constructorStandings: F1_FALLBACK_2026.constructors
  };

  setCache('standings', {
    ...processedData,
    lastUpdated: new Date(),
    apiSuccess: true
  });

  return { ...cache.standings, cached: false };
};

// Next race API - OpenF1 Live Calendar
export const getNextRace = async () => {
  if (isValidCache('nextRace')) {
    return { ...cache.nextRace, cached: true };
  }

  try {
    // Get current 2026 meetings from OpenF1
    const meetings = await apiCall(`${OPENF1_API}/meetings?year=2026`, 'Failed to fetch next race');
    
    if (meetings && meetings.length > 0) {
      const races = meetings
        .filter(meeting => meeting.meeting_official_name && meeting.meeting_official_name.includes('Grand Prix'))
        .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));

      const now = new Date();
      const nextRace = races.find(race => new Date(race.date_start) > now);

      if (nextRace) {
        const result = {
          nextRace: {
            round: races.indexOf(nextRace) + 1,
            race: nextRace.meeting_official_name.replace('Grand Prix', '').trim(),
            circuit: nextRace.location || 'Unknown Circuit',
            date: nextRace.date_start.split('T')[0],
            country: getCountryFlag(nextRace.country_name) || '🏁',
            location: nextRace.location,
            country_name: nextRace.country_name
          },
          totalRaces: races.length,
          success: true
        };

        setCache('nextRace', result);
        return { ...cache.nextRace, cached: false };
      }
    }
  } catch (error) {
    console.warn('OpenF1 next race failed, using fallback:', error);
  }

  // Fallback to static data
  const races = F1_FALLBACK_2026.schedule;
  const now = new Date();
  
  const nextRace = races.find(race => {
    const raceDate = new Date(race.date);
    return raceDate > now;
  });

  const result = {
    nextRace: nextRace || races[0],
    totalRaces: races.length,
    success: true
  };

  setCache('nextRace', result);
  return { ...cache.nextRace, cached: false };
};

// Utility functions
const getTeamColor = (constructorId) => {
  const colors = {
    red_bull: '#0600EF', red_bull_racing: '#0600EF',
    mclaren: '#FF8700', ferrari: '#DC0000',
    mercedes: '#00D2BE', aston_martin: '#006F62', aston_martin_racing: '#006F62',
    alpine: '#0090FF', alpine_renault: '#0090FF',
    williams: '#005AFF', williams_racing: '#005AFF',
    haas: '#FFFFFF', haas_f1_team: '#FFFFFF',
    rbpt: '#2B4562', racing_bulls: '#2B4562',
    audi: '#C1002B', cadillac: '#FFD700',
    sauber: '#52E252', kick_sauber: '#52E252',
    alfa_tauri: '#2B4562', alphatauri: '#2B4562',
    default: '#888888'
  };
  
  return colors[constructorId] || colors.default;
};

// 2026 F1 Points System (no fastest lap point)
const F1_POINTS_2026 = {
  race: { 1: 25, 2: 18, 3: 15, 4: 12, 5: 10, 6: 8, 7: 6, 8: 4, 9: 2, 10: 1 },
  sprint: { 1: 8, 2: 7, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1 }
};

// Get latest race results and calculate 2026 championship points
const getLatestRacePoints = async () => {
  try {
    // 1. Get latest 2026 race sessions
    const sessionsResponse = await apiCall(`${OPENF1_API}/sessions?session_type=Race&year=2026`, 'Failed to fetch sessions');
    const sessions = sessionsResponse || [];
    
    if (sessions.length === 0) {
      console.warn('No 2026 race sessions found');
      return [];
    }

    // Get the latest completed race session
    const latestSession = sessions[sessions.length - 1];
    const latestSessionKey = latestSession.session_key;

    // 2. Get driver final positions for that session
    const positionsResponse = await apiCall(`${OPENF1_API}/positions?session_key=${latestSessionKey}`, 'Failed to fetch race positions');
    const positions = positionsResponse || [];

    // 3. Calculate points for each driver
    const driverPoints = {};
    const lastPositions = {};
    
    // Get driver info for team mapping
    const driversResponse = await apiCall(`${OPENF1_API}/drivers?session_key=${latestSessionKey}`, 'Failed to fetch driver info');
    const drivers = driversResponse || [];

    positions.forEach(pos => {
      const finishPosition = parseInt(pos.position);
      const points = F1_POINTS_2026.race[finishPosition] || 0;
      
      driverPoints[pos.driver_number] = (driverPoints[pos.driver_number] || 0) + points;
      lastPositions[pos.driver_number] = pos;
    });

    // 4. Map to final standings format
    const results = Object.entries(driverPoints).map(([driverNum, points]) => {
      const driverInfo = drivers.find(d => d.driver_number == driverNum);
      const lastPosition = lastPositions[driverNum];
      
      return {
        driver_number: parseInt(driverNum),
        position: lastPosition?.position || 99,
        points: points,
        driver: driverInfo?.full_name || `Driver ${driverNum}`,
        team: driverInfo?.team_name || 'Unknown Team',
        color: driverInfo?.team_colour ? `#${driverInfo.team_colour}` : '#888888',
        driverId: driverInfo?.name_acronym?.toLowerCase() || `driver${driverNum}`,
        constructorId: driverInfo?.team_name?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
        wins: lastPosition?.position === 1 ? 1 : 0 // Simple win count from latest race
      };
    }).sort((a, b) => b.points - a.points);

    console.log('📊 2026 Race Results & Points Calculated:', results);
    return results;
  } catch (error) {
    console.error('Failed to calculate race points:', error);
    return [];
  }
};

// Calculate constructor standings from driver results
const calculateConstructorStandingsFromResults = (raceResults, drivers) => {
  const constructorPoints = {};
  
  raceResults.forEach(result => {
    const team = result.team;
    constructorPoints[team] = (constructorPoints[team] || 0) + result.points;
  });
  
  const standings = Object.entries(constructorPoints).map(([team, points], index) => {
    const driverInfo = drivers.find(d => d.team_name === team);
    
    return {
      pos: index + 1,
      team: team,
      points: points,
      wins: 0, // Would need race-by-race calculation
      color: driverInfo?.team_colour ? `#${driverInfo.team_colour}` : '#888888',
      constructorId: team.toLowerCase().replace(/\s+/g, '_')
    };
  }).sort((a, b) => b.points - a.points);

  console.log('🏆 Constructor Standings Calculated:', standings);
 return standings;
};

const getCountryFlag = (country) => {
  const flags = {
    Australia: '🇦🇺', China: '🇨🇳', Japan: '🇯🇵',
    Bahrain: '🇧🇭', 'Saudi Arabia': '🇸🇦', USA: '🇺🇸',
    Canada: '🇨🇦', Monaco: '🇲🇨', Spain: '🇪🇸',
    Austria: '🇦🇹', UK: '🇬🇧', Belgium: '🇧🇪',
    Hungary: '🇭🇺', Netherlands: '🇳🇱', Italy: '🇮🇹',
    Azerbaijan: '🇦🇿', Singapore: '🇸🇬', Mexico: '🇲🇽',
    Brazil: '🇧🇷', Qatar: '🇶🇦', UAE: '🇦🇪',
    'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Netherlands': '🇳🇱',
    '🇦🇺': '🇦🇺', '🇨🇳': '🇨🇳', '🇯🇵': '🇯🇵',
    '🇧🇭': '🇧🇭', '🇸🇦': '🇸🇦', '🇺🇸': '🇺🇸',
    '🇨🇦': '🇨🇦', '🇲🇨': '🇲🇨', '🇪🇸': '🇪🇸',
    '🇦🇹': '🇦🇹', '🇬🇧': '🇬🇧', '🇧🇪': '🇧🇪',
    '🇭🇺': '🇭🇺', '🇳🇱': '🇳🇱', '🇮🇹': '🇮🇹',
    '🇦🇿': '🇦🇿', '🇸🇬': '🇸🇬', '🇲🇽': '🇲🇽',
    '🇧🇷': '🇧🇷', '🇶🇦': '🇶🇦', '🇦🇪': '🇦🇪'
  };
  
  return flags[country] || '🏁';
};

export { clearCache, isValidCache, calculateConstructorStandingsFromResults as getConstructorStandingsFromResults };