import { supabase } from '../supabaseClient';

/**
 * Save or update high score for a game
 * @param {string} game - Game name: 'tetris', 'snake', 'pong', 'slot_machine', 'roulette'
 * @param {number} score - Score to save
 * @returns {Promise<boolean>} - Success status
 */
export const saveHighScore = async (game, score) => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log('No user logged in, score not saved');
      return false;
    }

    // Check if user has existing scores
    const { data: existing, error: fetchError } = await supabase
      .from('high_scores')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const gamesPlayedField = `games_played_${game === 'slot_machine' ? 'slots' : game}`;

    if (existing) {
      // Update existing record only if new score is higher
      const currentScore = existing[game] || 0;
      
      if (score > currentScore) {
        const { error: updateError } = await supabase
          .from('high_scores')
          .update({ 
            [game]: score,
            [gamesPlayedField]: (existing[gamesPlayedField] || 0) + 1
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
        console.log(`New high score saved for ${game}: ${score}`);
        return true;
      } else {
        // Just increment games played
        const { error: updateError } = await supabase
          .from('high_scores')
          .update({ 
            [gamesPlayedField]: (existing[gamesPlayedField] || 0) + 1
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
        console.log(`Game played count updated for ${game}`);
        return false;
      }
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('high_scores')
        .insert([{ 
          user_id: user.id,
          [game]: score,
          [gamesPlayedField]: 1
        }]);

      if (insertError) throw insertError;
      console.log(`First score saved for ${game}: ${score}`);
      return true;
    }
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
};

/**
 * Fetch all high scores for current user
 * @returns {Promise<Object|null>} - Scores object or null
 */
export const fetchHighScores = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return null;
    }

    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw error;
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching high scores:', error);
    return null;
  }
};

/**
 * Get high score for specific game
 * @param {string} game - Game name
 * @returns {Promise<number>} - High score or 0
 */
export const getGameHighScore = async (game) => {
  const scores = await fetchHighScores();
  return scores?.[game] || 0;
};

/**
 * Reset all high scores (for testing or user request)
 * @returns {Promise<boolean>} - Success status
 */
export const resetAllScores = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return false;
    }

    const { error } = await supabase
      .from('high_scores')
      .delete()
      .eq('user_id', user.id);

    if (error) throw error;
    console.log('All scores reset');
    return true;
  } catch (error) {
    console.error('Error resetting scores:', error);
    return false;
  }
};