const FETCH_MISSIONS = 'missions/missionSlice/FETCH_MISSIONS';
const FETCH_MISSIONS_SUCCESS = 'missions/missionSlice/FETCH_MISSIONS_SUCCESS';
// const FETCH_MISSIONS_ERROR = 'missions/missionSlice/FETCH_MISSIONS_ERROR';
const MISSIONS_JOINED = 'missions/missionSlice/MISSIONS_JOINED';
const MISSIONS_LEFT = 'missions/missionSlice/MISSIONS_LEFT';

const appUrl = 'https://api.spacexdata.com/v3/missions';

export const getMissions = () => async (dispatch) => {
  dispatch({ type: FETCH_MISSIONS });
  const missions = await fetch(appUrl);
  const myMissions = await missions.json();
  return dispatch({ type: FETCH_MISSIONS_SUCCESS, myMissions });
};

const initialState = {
  missions: [],
  status: 'fetching',
  loading: false,
  error: null,
};

export const populateMissions = (myMissions) => {
  const missionArr = [];
  for (let i = 0; i < myMissions.length; i += 1) {
    missionArr.push({
      id: myMissions[i].mission_id,
      name: myMissions[i].mission_name,
      description: myMissions[i].description,
      reserved: false,
    });
  }
  return missionArr;
};

export const joinMission = (payload) => (
  {
    type: MISSIONS_JOINED,
    payload,
  }
);

export const leaveMission = (payload) => (
  {
    type: MISSIONS_LEFT,
    payload,
  }
);

export const JoinedMissions = (state, id) => {
  const newState = state.map((mission) => {
    if (mission.id !== id) {
      return mission;
    }
    return { ...mission, reserved: true };
  });
  return newState;
};

export const missionsLeft = (state, id) => {
  const newState = state.map((mission) => {
    if (mission.id !== id) {
      return mission;
    }
    return { ...mission, reserved: false };
  });
  return newState;
};

const missionReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default missionReducer;
