import $ from 'cash-dom';

import { History } from '../components/History';

import { ServiceFactory } from '../api/ServiceFactory';
import {
  checkedPayload,
  checkedComment,
  checkedString,
  classNameToggle,
  formattedDate,
  toggleClass
} from '../utils/utils';
import { fakeData } from '../data/Data';

const userService = ServiceFactory.get('userDetails');
const eventsService = ServiceFactory.get('eventsDetails');

export class AppService {
  initializedOrUpdated() {
    this.initialHistory();

    $('.load-username').on('click', () => {
      const userName = $('.username.input').val();

      if (checkedString(userName)) {
        try {
          this.updatedProfile(userName);
          this.updatedHistoryEvents(userName);

          toggleClass($, 'removeClass');
        } catch (err) {
          console.log(err);
        }
      } else {
        return toggleClass($, 'addClass');
      }
    });
  }

  updatedProfile(userName) {
    userService.getUserDetails(userName).then((data) => {
      if (!data) return;

      this.profile = data;
      this.updateProfile();
    });
  }

  updatedHistoryEvents(userName) {
    eventsService.getEventsDetails(userName).then((data) => {
      if (!data) return;

      this.history = data;
      this.updateHistory();
    });
  }

  initialHistory() {
    let container = document.getElementById('user-timeline');
    container.innerHTML = '';

    fakeData.map(
      ({ date, img, userUrl, userName, status, pullRequestUrl, pullRequest, repoName, comment, commentUrl }) => {
        const className = comment ? 'is-primary' : 'is-secondary';

        const content = History(
          date,
          userName,
          userUrl,
          img,
          status,
          pullRequest,
          pullRequestUrl,
          repoName,
          className,
          commentUrl
        );

        container.innerHTML += content;
      }
    );
  }

  updateHistory() {
    if (this.history.message) return $('#user-timeline').text('Not found history');

    let container = document.getElementById('user-timeline');
    container.innerHTML = '';

    this.history
      .filter(({ type }) => type === 'PullRequestEvent' || type === 'PullRequestReviewCommentEvent')
      .map(({ type, created_at, payload, repo: { name } }) => {
        const {
          action,
          pull_request: { url }
        } = payload;

        const { dateToShow } = formattedDate(created_at);
        const content = History(
          dateToShow,
          checkedPayload(payload, 'login'),
          checkedPayload(payload, 'html_url'),
          checkedPayload(payload, 'avatar_url'),
          action,
          type,
          url,
          name,
          classNameToggle(payload),
          checkedComment(payload, 'html_url')
        );

        container.innerHTML += content;
      });
  }

  updateProfile() {
    const { login, avatar_url, html_url, bio } = this.profile;
    const userName = this.profile.message ? this.profile.message : $('.username.input').val();

    $('#profile-name').text(userName);
    $('#profile-image').attr('src', avatar_url || '');
    $('#profile-url')
      .attr('href', html_url || '')
      .text(login || '');
    $('#profile-bio').text(bio || '(no information)');
  }

  validation() {
    $('.input-username').on('change', () => {
      const userName = $('.username.input').val();

      if (!checkedString(userName)) return toggleClass($, 'addClass');

      return toggleClass($, 'removeClass');
    });
  }
}
