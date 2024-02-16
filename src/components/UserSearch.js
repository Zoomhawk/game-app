// UserSearch.js

import React, { useState } from 'react';
import PlayerProfile from './PlayerProfile';

const UserSearch = ({ onPlayerSelect }) => {
  const [username, setUsername] = useState('');
  const [searchedPlayer, setSearchedPlayer] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      // Perform a search for the specified username from Lichess API
      const response = await fetch(`https://lichess.org/api/user/${username}`);
      const data = await response.json();

      // Update the searchedPlayer state with fetched data
      const updatedSearchedPlayer = {
        id: data.id,
        username: data.username,
        avatar: data.avatar,
        followers: data.follows.length,
        gamesPlayed: data.pergames?.total?.games
      };

      // Call onPlayerSelect with the selected player data
      onPlayerSelect(updatedSearchedPlayer);

      // Set the searched player state for display
      setSearchedPlayer(updatedSearchedPlayer);
    } catch (error) {
      console.error('Error searching for user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>User Search</h3>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {searchedPlayer && (
        <>
          <h4>Search Results</h4>
          {/* Display the searched player's profile */}
          <PlayerProfile player={searchedPlayer} />
        </>
      )}
    </div>
  );
};

export default UserSearch;
