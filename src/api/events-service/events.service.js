import { HTTP } from '../HTTP';

const eventDetailsEndpoint = (username) => `https://api.github.com/users/${username}/events/public`;

export default {
  getEventsDetails(userName) {
    return HTTP(eventDetailsEndpoint(userName));
  }
};
