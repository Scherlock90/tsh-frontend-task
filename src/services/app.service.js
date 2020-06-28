import $ from 'cash-dom';

import { ServiceFactory } from '../api/ServiceFactory';
import { checkString, toggleClass } from '../utils/utils';

const userService = ServiceFactory.get('userDetails');

export class AppService {
  initializeOrUpdateProfile() {
    let self = this;

    $('.load-username').on('click', () => {
      const userName = $('.username.input').val();

      if (checkString(userName)) {
        try {
          userService.getUserDetails(userName).then((data) => {
            self.profile = data;
            self.updateProfile();
          });

          toggleClass($, 'removeClass');
        } catch (err) {
          console.log(err);
        }
      } else {
        return toggleClass($, 'addClass');
      }
    });
  }

  updateProfile() {
    $('#profile-name').text($('.username.input').val());
    $('#profile-image').attr('src', this.profile.avatar_url);
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login);
    $('#profile-bio').text(this.profile.bio || '(no information)');
  }

  validation() {
    $('.input-username').on('change', () => {
      const userName = $('.username.input').val();

      if (!checkString(userName)) return toggleClass($, 'addClass');

      return toggleClass($, 'removeClass');
    });
  }
}
