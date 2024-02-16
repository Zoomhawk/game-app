// App.js

import React, { useState } from 'react';
import PlayerProfile from './components/PlayerProfile';
import GameList from './components/GameList';
import GameSearch from './components/GameSearch';
import UserSearch from './components/UserSearch';

const App = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div>
      <h1>Lichess Player Viewer</h1>
      
      {/* User Search Component */}
      <UserSearch onPlayerSelect={handlePlayerSelect} />

      {selectedPlayer && (
        <div>
          {/* Player Profile Component */}
          <PlayerProfile player={selectedPlayer} />

          {/* Game Search Component */}
          <GameSearch playerId={selectedPlayer.id} />

          {/* Game List Component */}
          <GameList playerId={selectedPlayer.id} />
        </div>
      )}
    </div>
  );
};

export default App;
