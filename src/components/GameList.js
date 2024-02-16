// GameList.js

import React, { useState, useEffect } from 'react';

const GameList = ({ playerId }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch the last 5 games for the player from Lichess API
        const response = await fetch(`https://lichess.org/api/games/user/${playerId}?max=5`);
        const data = await response.json();
        
        // Update the games state with fetched data
        const updatedGames = data.map((game) => ({
          id: game.id,
          opponent: game.players.white.userId === playerId ? game.players.black.username : game.players.white.username,
          status: game.status,
          duration: game.speed,
        }));

        // Set loading to false and update the games state
        setLoading(false);
        setGames(updatedGames);
      } catch (error) {
        console.error('Error fetching games', error);
        setLoading(false);
      }
    };

    fetchGames();
  }, [playerId]);

  return (
    <div>
      {loading ? (
        <p>Loading game data...</p>
      ) : (
        <>
          <h3>Last 5 Games</h3>
          <ul>
            {games.map((game) => (
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

export default GameList;
