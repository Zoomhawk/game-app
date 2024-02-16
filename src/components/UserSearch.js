// UserSearch.js

import React, { useState } from 'react';
import PlayerProfile from './PlayerProfile';
import axios from 'axios';

const UserSearch = ({ onPlayerSelect }) => {
  const [username, setUsername] = useState('');
  const [searchedPlayer, setSearchedPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState()


  /*const handleSearch = async () => {
    setLoading(true);

    try {
      // Perform a search for the specified username from Lichess API
      const response = await fetch(`https://lichess.org/api/user/${username}`, {mode:'cors'});
      console.log(response)

      // Update the searchedPlayer state with fetched data
      const updatedSearchedPlayer = {
        id: data.id,
        username: data.username,
        avatar: data.avatar,
        followers: data.follows.length,
        gamesPlayed: data.pergames?.total?.games,
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


  */
  const handleSearch = async () => {
    setLoading(true);
    await axios.get(`https://lichess.org/api/user/${username}`).then((res) => {
      setData(res.data);
      console.log(res.data)
    })
     
  }
  
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

      {data && (
        <>
          <h4>Search Results</h4>
          {/* Display the searched player's profile */}
          {/* <PlayerProfile player={searchedPlayer} /> */}
      
          <h2>{data.username}</h2> {/* Update this line */}
          <h2>Classical rating :{data.perfs.classical.rating}</h2> {/* Update this line */}
          <p>Total Games: {data.count.all}</p> {/* Update this line */}
          <p>Created at: {data.playTime.total}</p> {/* Update this line */}
    
        </>
      )}

    </div>
  );
};

export default UserSearch;
