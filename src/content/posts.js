import art1 from "./images/art-001.png";
import art2 from "./images/art-002.png";

const POSTS = [
  { id: "fic-1", category: "fiction", title: "레이디두아", author: "사이",  tags: ["계깡"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-1.md` },
  { id: "fic-2", category: "fiction", title: "이 사랑도 통역이 되나요",    author: "익명B",   tags: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-2.md` },
  { id: "fic-3", category: "fiction", title: "fic-3",    author: "새콤",    tags: ["계깡"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-3.md` },
  { id: "fic-4", category: "fiction", title: "fic-4",    author: "대해",    tags: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-4.md` },
  { id: "fic-5", category: "fiction", title: "fic-5",    author: "겐",      tags: ["둥헌"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-5.md` },
  { id: "fic-6", category: "fiction", title: "fic-6",    author: "짱",      tags: ["둥연"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-6.md` },
  { id: "fic-7", category: "fiction", title: "fic-7",    author: "익명A",   tags: ["계묭"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-7.md` },
  { id: "fic-8", category: "fiction", title: "fic-8",    author: "뚱개",    tags: ["계깡·둥헌"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-8.md` },
  { id: "fic-9", category: "fiction", title: "fic-9",    author: "익명C",   tags: ["일반"], bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-9.md` },

  { id: "art-1", category: "art", title: "art-1", author: "고까냥", tags: ["계깡"], imageUrl: art1 },
  { id: "art-2", category: "art", title: "art-2", author: "짱페스", tags: ["둥헌"], imageUrl: art2 },
  { id: "art-3", category: "art", title: "art-3", author: "익명D",  tags: ["계깡"], imageUrl: art2 },
  { id: "art-4", category: "art", title: "art-4", author: "비누",   tags: ["계묭"], imageUrl: art2 },

  { id: "video-1", category: "video", title: "Trailer 01", author: "익명E", tags: ["둥헌"], youtubeId: "u5wMLWs6LSs" },
];

export function getPostsByCategory(category) {
  return POSTS.filter((p) => p.category === category);
}

export function getPostById(id) {
  return POSTS.find((p) => p.id === id) || null;
}