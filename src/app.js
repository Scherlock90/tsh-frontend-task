import './assets/scss/app.scss';

import { AppService } from './services/app.service';

const appService = new AppService();

export class App {
  initializeApp() {
    appService.initializedOrUpdated();
    appService.validation();
  }
}
