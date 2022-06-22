const FETCH_MISSIONS = 'missions/missionSlice/FETCH_MISSIONS';
const FETCH_MISSIONS_SUCCESS = 'missions/missionSlice/FETCH_MISSIONS_SUCCESS';
const FETCH_MISSIONS_ERROR = 'missions/missionSlice/FETCH_MISSIONS_ERROR';
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

const populateMissions = (myMissions) => {
  const missionArr = [];
  for (let i = 0; i < myMissions.length; i += 1) {
    missionArr.push({
      id: myMissions[i].mission_id,
      name: myMissions[i].mission_name,
      description: myMissions[i].description,
      reserved: false,
    });
  }
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
    case FETCH_MISSIONS:
      return { ...state, loading: true };
    case FETCH_MISSIONS_SUCCESS:
      populateMissions(action.myMissions);
      return { ...state, loading: false, missions: populateMissions(action.myMissions) };
    case FETCH_MISSIONS_ERROR:
      return { ...state, loading: false, error: action.error };
    case MISSIONS_LEFT:
      return { ...state, missions: missionsLeft(state.missions, action.payload) };

    default:
      return state;
  }
};

export default missionReducer;
