import React from 'react';
import RocketProfile from './rocketsComponent/RocketProfile';
import MissionProfile from './missionsComponent/missionsProfile';

const MyProfile = () => (

  <main className="profile-main">
    <MissionProfile />
    <RocketProfile />
  </main>
);

export default MyProfile;
