// 帐号校验
export const validateUsername = (value) => {
  return /^.{4,20}$/.test(value)
}

// 密码校验
export const validatePassword = (value) => {
  return /^[A-Za-z0-9]{4,20}$/.test(value)
}
