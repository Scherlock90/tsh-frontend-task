import $ from 'cash-dom';

import { History } from '../components/History';

import { ServiceFactory } from '../api/ServiceFactory';
import {
  checkedPayload,
  checkedComment,
  checkedString,
  classNameToggle,
  formattedDate,
  toggleContainer,
  toggleErrorClass,
  toggleSpinnerClass
} from '../utils/utils';
import { fakeData } from '../data/Data';

const userService = ServiceFactory.get('userDetails');
const eventsService = ServiceFactory.get('eventsDetails');

export class AppService {
  initializedOrUpdated() {
    this.initialHistory();
    this.triggerSearchedProfileAndHistory();

    $('.load-username').on('click', () => {
      const userName = $('.username.input').val();

      if (checkedString(userName)) {
        try {
          toggleSpinnerClass($, 'removeClass');
          toggleContainer($, 'addClass');

          this.searchedProfile(userName);
          this.searchedHistoryEvents(userName);

          toggleErrorClass($, 'removeClass');
        } catch (err) {
          console.log(err);
        }
      } else {
        return toggleErrorClass($, 'addClass');
      }
    });
  }

  triggerSearchedProfileAndHistory() {
    const input = document.getElementById('input-username');

    input.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('load-username').click();
      }
    });
  }

  async searchedProfile(userName) {
    const response = await userService.getUserDetails(userName);
    const data = await response.json();

    if (!data) return;

    this.profile = data;
    this.updateProfile();
  }

  async searchedHistoryEvents(userName) {
    const response = await eventsService.getEventsDetails(userName);
    const data = await response.json();

    if (!data) return;

    this.history = data;
    this.updateHistory();
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
    if (this.history.message) {
      $('#user-timeline').text('Not found history');
      toggleSpinnerClass($, 'addClass');
      toggleContainer($, 'removeClass');
      return;
    }

    let container = document.getElementById('user-timeline');
    container.innerHTML = '';

    this.history
      .filter(({ type }) => type === 'PullRequestEvent' || type === 'PullRequestReviewCommentEvent')
      .map(({ type, created_at, payload, repo: { name } }) => {
        const {
          action,
          pull_request: { html_url }
        } = payload;

        const { dateToShow } = formattedDate(created_at);
        const content = History(
          dateToShow,
          checkedPayload(payload, 'login'),
          checkedPayload(payload, 'html_url'),
          checkedPayload(payload, 'avatar_url'),
          action,
          type,
          html_url,
          name,
          classNameToggle(payload),
          checkedComment(payload, 'html_url')
        );

        container.innerHTML += content;
      });

    toggleSpinnerClass($, 'addClass');
    toggleContainer($, 'removeClass');
  }

  updateProfile() {
    const conditionName = this.profile.message ? this.profile.message : $('.username.input').val();

    const { login, avatar_url, html_url, bio } = this.profile;

    $('#profile-name').text(conditionName);
    $('#profile-image').attr('src', avatar_url || '');
    $('#profile-url')
      .attr('href', html_url || '')
      .text(login || '');
    $('#profile-bio').text(bio || '(no information)');
  }

  validation() {
    $('.input-username').on('change', () => {
      const userName = $('.username.input').val();

      if (!checkedString(userName)) return toggleErrorClass($, 'addClass');

      return toggleErrorClass($, 'removeClass');
    });
  }
}
