import art1 from "./images/art-01.webp";
import art2 from "./images/art-002.webp";

const POSTS = [
  { id: "fic-1", category: "fiction", title: "우리가 헤어진 진짜 이유", author: "사이", tag: ["계깡"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-1.md` },
  { id: "fic-2", category: "fiction", title: "초점의 궤도",          author: "대해", tag: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-2.md` },
  { id: "fic-3", category: "fiction", title: "우연보단 필연",         author: "익명A",  tag: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-3.md` },
  { id: "fic-4", category: "fiction", title: "미제출",              author: "익명B",  tag: ["계깡"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-4.md` },
  { id: "fic-5", category: "fiction", title: "미제출",              author: "겐",    tag: ["둥헌"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-5.md` },
  { id: "fic-6", category: "fiction", title: "GYEKEY 17",         author: "뚱개",    tag: ["계깡", "둥헌"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-6.md` },
  { id: "fic-7", category: "fiction", title: "눈치 되게 없네",        author: "새콤", tag: ["계깡"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-7.md` },
  { id: "fic-8", category: "fiction", title: "미제출",              author: "짱",  tag: ["둥연"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-8.md` },
  { id: "fic-9", category: "fiction", title: "독약이라도 기꺼이",      author: "익명C", tag: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-9.md` },

  { id: "art-1", category: "art", title: "파랑",   author: "고까냥", tag: ["계깡"], imageUrl: art1 },
  { id: "art-2", category: "art", title: "미제출", author: "짱페스", tag: ["둥헌"], imageUrl: art2 },
  { id: "art-3", category: "art", title: "미제출", author: "익명D",  tag: ["계깡"], imageUrl: art2 },
  { id: "art-4", category: "art", title: "미제출", author: "비누",   tag: ["계묭"], imageUrl: art2 },

  { id: "video-1", category: "video", title: "I can be your rockstar", author: "익명E", tag: ["둥헌"], youtubeId: "TflddqvsPoM" },

  { id: "rev-1", category: "review", title: "익명A", author: "작성자1", bodyUrl: `${process.env.PUBLIC_URL}/content/rev/rev-1.md` },
  { id: "rev-2", category: "review", title: "리뷰 제목 2", author: "작성자2", bodyUrl: `${process.env.PUBLIC_URL}/content/rev/rev-2.md` },
  { id: "rev-3", category: "review", title: "리뷰 제목 3", author: "작성자3", bodyUrl: `${process.env.PUBLIC_URL}/content/rev/rev-3.md` },
  { id: "rev-4", category: "review", title: "리뷰 제목 4", author: "작성자4", bodyUrl: `${process.env.PUBLIC_URL}/content/rev/rev-4.md` },
  { id: "rev-5", category: "review", title: "리뷰 제목 5", author: "작성자5", bodyUrl: `${process.env.PUBLIC_URL}/content/rev/rev-5.md` },
];

export function getPostsByCategory(category) {
  return POSTS.filter((p) => p.category === category);
}

export function getPostById(id) {
  return POSTS.find((p) => p.id === id) || null;
}