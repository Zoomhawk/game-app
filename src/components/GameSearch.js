// GameSearch.js

import React, { useState } from 'react';

const GameSearch = ({ playerId }) => {
  const [opponentUsername, setOpponentUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Perform a search for games with the specified opponentUsername from Lichess API
      const response = await fetch(`https://lichess.org/api/games/user/${playerId}?opponent=${opponentUsername}`);
      const data = await response.json();

      // Update the searchResults state with fetched data
      const updatedSearchResults = data.map((game) => ({
        id: game.id,
        opponent: game.players.white.userId === playerId ? game.players.black.username : game.players.white.username,
        status: game.status,
        duration: game.speed,
      }));

      setSearchResults(updatedSearchResults);
    } catch (error) {
      console.error('Error searching for games', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Game Search</h3>
      <input
        type="text"
        placeholder="Enter opponent's username"
        value={opponentUsername}
        onChange={(e) => setOpponentUsername(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {searchResults.length > 0 && (
        <>
          <h4>Search Results</h4>
          <ul>
            {searchResults.map((game) => (
              <li key={game.id}>
                <p>Opponent: {game.opponent}</p>
                <p>Status: {game.status}</p>
                <p>Duration: {game.duration}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GameSearch;
