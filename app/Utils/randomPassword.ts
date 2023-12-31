export const randomPassword = (length = 6) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    password += Math.round(Math.random() * 10);
  }

  return password;
};
randomPassword();
