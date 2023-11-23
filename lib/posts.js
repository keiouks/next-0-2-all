import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdown } from './markdown.js';
import md5 from 'crypto-js/md5.js';

const postsDirectory = path.join(process.cwd(), 'posts');

const id2Name = {};
function setId2Name(id, name) {
  id2Name[id] = name;
}

function getNameWithId(id) {
  return id2Name[id];
}

let cachePostsData = undefined;

// 当前默认以目录形式存放文档，目录名即文章名
// 会过滤掉目录以外的文件，且文章内容放在目录下index.md文件中
export function getSortedPostsData(noCache) {
  if (!noCache && cachePostsData) {
    return cachePostsData;
  }
  // Get dirents under /posts
  const dirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  const allPostsData = dirents.filter((dirent) => (dirent.isDirectory())).map((dirent) => {
    const id = getHash(dirent.name);
    setId2Name(id, dirent.name);
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, dirent.name, 'index.md');
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id: [id, 'post'],
      ...matterResult.data,
    };
  });
  // Sort posts by date
  cachePostsData = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return cachePostsData;
}

export async function getPostData(id) {
  const name = getNameWithId(id);
  const fullPath = path.join(postsDirectory, name, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const contentHtml = await markdown.render(matterResult.content);

  return {
    contentHtml,
    ...matterResult.data,
  }
}

export function getHash(str) {
  return `XKK_K_${md5(str).toString().slice(0, 22)}`;
}
