import { HTTP } from '../HTTP';

const userDetailEndpoint = 'https://api.github.com/users/';

export default {
  getUserDetails(userName) {
    return HTTP(userDetailEndpoint + userName);
  }
};
