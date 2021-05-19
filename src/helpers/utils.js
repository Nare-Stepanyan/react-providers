export const upper = (lower) => {
  return lower.charAt(0).toUpperCase() + lower.substring(1);
};

const validateEmail = (email) => {
  //eslint-disable-next-line
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email);
};

const validatePhone = (num) => {
  let reg = /\d/g;
  return reg.test(num);
};

const validateName = (name) => {
  let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  return reg.test(name);
};

export const isInObject = (data, object) => {
  return Object.values(object).includes(data);
};

export const isEmailExist = (data, arr) => {
  return arr.some((el) => el.email === data);
};

export const isProviderExist = (data, arr) => {
  return arr.some((el) => el.name === data);
};

export const checkData = (name, email, phone, object) => {
  const errors = {};
  if (name === "") {
    errors.name = "*is required";
  } else if (!validateName(name)) {
    errors.name = "*invalid";
  }
  if (email === "") {
    errors.email = "*is required";
  } else if (!validateEmail(email)) {
    errors.email = "*invalid";
  } else if (isEmailExist(email, object)) {
    errors.email = "*email exists";
  }
  if (phone === "") {
    errors.phone = "*is required";
  } else if (!validatePhone(phone)) {
    errors.phone = "*invalid";
  }
  return errors;
};
