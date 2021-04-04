import * as admin from 'firebase-admin'

const forbiddenSlugs = ['url', 'dashboard', 'api', 'docs', 'app']

export const checkSlug = async (slug: string): Promise<boolean> => {
  if (forbiddenSlugs.includes(slug)) {
    return false
  }

  return await admin
    .database()
    .ref(`routes/${slug}`)
    .get()
    .then(result => !result.exists());
}

export const getSlug = async (custom: string, replaceIfExists: boolean): Promise<string> => {
  let slug: string | undefined
  if (custom) {
    if (!await checkSlug(custom)) {
      if (!replaceIfExists) {
        throw 'Slug not available'
      }
    } else {
      slug = custom
    }
  }

  if (!slug) {
    let randSlug

    do {
      randSlug = randomSlug()
    } while (!await checkSlug(randSlug))

    slug = randSlug
  }

  return slug
}

export const randomSlug = (): string => Math.random().toString(36).substring(7)
