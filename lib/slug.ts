const bas64url = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

export const getRandomSlug = (length = 6): string => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += bas64url.charAt(
      Math.floor(Math.random() * bas64url.length)
    )
  }

  return result
}
