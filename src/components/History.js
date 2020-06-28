import { renderCondition } from '../utils/utils';

export const History = (
  created_at,
  login,
  url,
  avatar,
  action,
  type,
  pullrequestUrl,
  nameRepo,
  className,
  commentToPR
) => {
  return `
      <div class="timeline-item ${className}">
      <div class="timeline-marker ${className}"></div>
      <div class="timeline-content">
        <p class="heading">${created_at}</p>
        <div class="content">
          <span class="gh-username">
            <img src=${avatar} />
          </span>
          <a href=${url}>${login}</a>
          ${action}
          <a href=${renderCondition(type, commentToPR, pullrequestUrl)}>
          ${renderCondition(type, 'comment', 'pull request')}</a>
          ${renderCondition(type, '<span>to</span>', '')}
          ${renderCondition(type, `<a href="${pullrequestUrl}">pull request</a>`, '')}
          <p class="repo-name">
            <a href='https://github.com/${nameRepo}'>${nameRepo}</a>
          </p>
        </div>
      </div>
    </div>
    `;
};
