const regex = new RegExp('^[a-zA-Z0-9_-]+$');

export const checkString = (userName) => {
  return regex.test(userName);
};

export const toggleClass = (cashDom, removeOrAddClass) => {
  return cashDom('.input-username')[removeOrAddClass]('input-username__error');
};
