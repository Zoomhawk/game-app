// PlayerProfile.js

import React, { useState, useEffect } from 'react';

const PlayerProfile = ({ player }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); // Add this line

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Fetch player data from Lichess API using the player's username
        const response = await fetch(`https://lichess.org/api/user/${player.username}`);
        const data = await response.json();
        
        // Update the player state with fetched data
        const updatedPlayer = {
          username: data.username,
          avatar: data.avatar,
          followers: data.follows.length,
          gamesPlayed: data.perfs?.total?.games,
        };

        // Set loading to false and update the profile state
        setLoading(false);
        setProfile(updatedPlayer); // Update this line
      } catch (error) {
        console.error('Error fetching player data', error);
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [player]);

  return (
    <div>
      {loading ? (
        <p>Loading player data...</p>
      ) : (
        <>
          <h2>{profile.username}</h2> {/* Update this line */}
          <img src={profile.avatar} alt="Player Avatar" /> {/* Update this line */}
          <p>Followers: {profile.followers}</p> {/* Update this line */}
          <p>Games Played: {profile.gamesPlayed}</p> {/* Update this line */}
        </>
      )}
    </div>
  );
};

export default PlayerProfile;
