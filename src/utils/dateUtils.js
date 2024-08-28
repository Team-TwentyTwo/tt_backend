export function createdAtChecking(createdAt){
  // 1년을 밀리초로 표현
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
  // createdAt을 Date 객체로 변환
  const createdDate = new Date(createdAt);
  // 현재 시간
  const now = new Date();

  // 1년 이상 지났으면 true를 반환하고, 그렇지 않으면 false를 반환
  return now - createdDate >= oneYearInMillis;
}