export const translate = (title: string): string | boolean => {
  if (!title) return false;

  let newTitle: string = '';

  if (title === 'name') {
    newTitle = `Ім'я`;
  } else if (title === 'phone') {
    newTitle = 'Телефон';
  } else if (title === 'email') {
    newTitle = 'Email';
  } else if (title === 'contacts') {
    newTitle = 'Контакти';
  } else if (title === 'payment') {
    newTitle = 'Спосіб оплати';
  } else if (title === 'address') {
    newTitle = 'Адреса';
  } else if (title === 'comments') {
    newTitle = `Коментар для кур'єра`;
  }

  return newTitle;
};
