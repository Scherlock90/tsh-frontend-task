import UserService from './user-service/user.service';
import EventsService from './events-service/events.service';

const services = {
  userDetails: UserService,
  eventsDetails: EventsService
};

export const ServiceFactory = {
  get: (name) => services[name]
};
