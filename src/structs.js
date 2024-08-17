import * as s from 'superstruct';

// Custom Refinements : 해시태그가 '#'으로 시작하는지 확인
const Hashtag = s.refine(s.string(), 'Hashtag', (value) => value.startsWith('#'));

export const CreatedGroup = s.object({
  name: s.string(),
  password: s.string(),
  imageURL: s.string(),
  isPublic: s.boolean(),
  introduction: s.string()
})

export const PatchGroup = s.partial(CreatedGroup);

export const CreatedPost = s.object({
  nickname: s.string(),
  title: s.string(),
  content: s.string(),
  postPassword: s.string(),
  groupPassword: s.string(),
  imageURL: s.string(),
  tags: s.array(Hashtag),
  location: s.string(),
  moment: s.string(),
  isPublic: s.boolean()
})

export const PatchPost = s.partial(CreatedPost);

export const CreatedComment = s.object({
  nickname: s.string(),
  content: s.string(),
  password: s.string()
})

export const PatchComment = s.partial(CreatedComment);