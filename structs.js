import * as s from 'superstruct';
import isEmail from 'is-email';

export const CreatedGroup = s.object({
  name: s.string(),
  password: s.string(),
  imageURL: s.string(),
  isPublic: s.boolean(),
  introduction: s.string()
})

export const PatchGroup = s.partial(CreatedUser);

export const CreatedPost = s.object({
  nickname: s.string(),
  title: s.string(),
  content: s.string(),
  postPassword: s.string(),
  groupPassword: s.string(),
  imageURL: s.string(),
  tags: s.array(s.string()),
  location: s.string(),
  moment: s.date(),
  isPublic: s.boolean()
})

export const PatchPost = s.partial(CreatedUser);

export const CreatedComment = s.object({
  nickname: s.string(),
  content: s.string(),
  password: s.string()
})

export const PatchComment = s.partial(CreatedUser);