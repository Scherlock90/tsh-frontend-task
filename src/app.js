import './assets/scss/app.scss';
import $ from 'cash-dom';

import { ServiceFactory } from './api/ServiceFactory';

const userService = ServiceFactory.get('userDetails');

export class App {
  initializeApp() {
    let self = this;

    $('.load-username').on('click', () => {
      let userName = $('.username.input').val();

      try {
        userService.getUserDetails(userName).then((data) => {
          self.profile = data;
          self.update_profile();
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  update_profile() {
    $('#profile-name').text($('.username.input').val());
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }
}
