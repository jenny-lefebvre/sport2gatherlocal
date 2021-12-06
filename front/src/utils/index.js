/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
export const renderLevel = (level) => {
  let minLevel = '';
  if (level == 1) {
    minLevel = 'Débutant';
  }
  if (level == 2) {
    minLevel = 'Confirmé';
  }
  if (level == 3) {
    minLevel = 'Expert';
  }
  return minLevel;
};

export const renderDate = (dateString) => {
  const substrDate = dateString.substr(0, 10);
  const params = substrDate.split('-');
  const [year, month, day] = params;
  const event = new Date(Date.UTC(year, month - 1, day));
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const localDate = event.toLocaleDateString(undefined, options);
  return (localDate);
};
