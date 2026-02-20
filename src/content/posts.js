import art1 from "./images/art-001.png";
import art2 from "./images/art-002.png";

const POSTS = [
  { id: "fic-1", category: "fiction", title: "fic-1", author: "사이",  tag1: "ADULT", tag2: "계깡", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-1.md` },
  { id: "fic-2", category: "fiction", title: "fic-2",    author: "익명B",              tag2: "일반", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-2.md` },
  { id: "fic-3", category: "fiction", title: "fic-3",    author: "새콤",               tag2: "계깡", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-3.md` },
  { id: "fic-4", category: "fiction", title: "초점의 궤도",    author: "대해",               tag2: "계묭", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-4.md` },
  { id: "fic-5", category: "fiction", title: "fic-5",    author: "겐",                 tag2: "둥헌", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-5.md` },
  { id: "fic-6", category: "fiction", title: "fic-6",    author: "짱",                 tag2: "둥연", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-6.md` },
  { id: "fic-7", category: "fiction", title: "fic-7",    author: "익명A",              tag2: "일반", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-7.md` },
  { id: "fic-8", category: "fiction", title: "fic-8",    author: "뚱개",  tag1: "ADULT", tag2: "계깡", tag3: "둥헌", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-8.md` },
  { id: "fic-9", category: "fiction", title: "fic-9",    author: "익명C",              tag2: "일반", bodyUrl: `${process.env.PUBLIC_URL}/content/fic/fic-9.md` },

  { id: "art-1", category: "art", title: "art-1", author: "고까냥", tag2: "일반", imageUrl: art1 },
  { id: "art-2", category: "art", title: "art-2", author: "짱페스", tag2: "일반", imageUrl: art2 },
  { id: "art-3", category: "art", title: "art-3", author: "익명D",  tag2: "일반", imageUrl: art2 },
  { id: "art-4", category: "art", title: "art-4", author: "비누",   tag2: "일반", imageUrl: art2 },

  { id: "video-1", category: "video", title: "Trailer 01", author: "익명E", tag2: "둥헌", youtubeId: "BgS0w12oTOg" },
];

export function getPostsByCategory(category) {
  return POSTS.filter((p) => p.category === category);
}

export function getPostById(id) {
  return POSTS.find((p) => p.id === id) || null;
}