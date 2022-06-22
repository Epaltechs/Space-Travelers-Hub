import { Axios } from 'axios';

const FETCH_ROCKET = 'space_travelers_hub/rockets/FETCH_ROCKET';
const BOOK_ROCKET = 'space_travelers_hub/rockets/BOOK_ROCKET';

// actions

const fetchRocket = (payload) => ({
  type: FETCH_ROCKET,
  payload,
});

const bookRocket = (payload) => ({
  type: BOOK_ROCKET,
  payload,
});

export default bookRocket;

//   APIs-functions

export const fetchRocketApi = () => async (dispatch) => {
  const returnValue = await Axios.get('https://api.spacexdata.com/v3/rockets');
  const { data } = returnValue;
  const rockets = [];
  for (let i = 0; i < data.length; i += 1) {
    const name = data[i].rocket_name;
    const { id } = data[i];
    const { description } = data[i];
    const image = data[i].flickr_images[0];
    const reserved = false;
    const object = {
      id, name, description, image, reserved,
    };
    rockets.push(object);
  }
  dispatch(fetchRocket(rockets));
};
