const regex = new RegExp('^[a-zA-Z0-9_-]+$');

export const checkedString = (userName) => {
  return regex.test(userName);
};

export const toggleErrorClass = (cashDom, removeOrAddClass) => {
  return cashDom('.input-username')[removeOrAddClass]('input-username__error');
};

export const toggleSpinnerClass = (cashDom, removeOrAddClass) => {
  return cashDom('#spinner')[removeOrAddClass]('is-hidden');
};

export const toggleContainer = (cashDom, removeOrAddClass) => {
  return cashDom('#container')[removeOrAddClass]('is-hidden-container');
};

export const formattedDate = (date) => {
  const formatDate = new Date(date).toDateString();
  const [, month, day, year] = formatDate.split(' ');
  const dateToShow = `${month} ${day}, ${year}`;

  return { dateToShow };
};

export const classNameToggle = (isComment) => (isComment.comment ? 'is-primary' : 'is-secondary');

export const checkedPayload = (payload, param) =>
  payload.comment ? payload.comment.user[param] : payload.pull_request.user[param];

export const checkedComment = (payload, param) =>
  payload.comment ? payload.comment[param] : payload.pull_request[param];

export const renderCondition = (type, firstResult, secondResult) =>
  type === 'PullRequestReviewCommentEvent' ? firstResult : secondResult;
