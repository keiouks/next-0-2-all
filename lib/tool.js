import fs from 'fs';
import path from 'path';
import { getHash } from './posts.js';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public');

export function moveAllPostImage2Public() {
  const dirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  dirents.filter((dirent) => (dirent.isDirectory())).forEach((dirent) => {
    const id = getHash(dirent.name);
    moveOnePostImage2Public(id, dirent.name);
  });
}

export function moveOnePostImage2Public(id, name) {
  const subDirents = fs.readdirSync(path.join(postsDirectory, name), { withFileTypes: true });
  subDirents.filter((dirent) => (dirent.isFile())).forEach((dirent) => {
    if (['.jpg', '.jpeg', '.png', '.gif', '.ico', '.svg'].includes(path.extname(dirent.name))) {
      const distPath = path.join(publicDirectory, id);
      fs.mkdirSync(distPath, {recursive: true});
      fs.copyFileSync(path.join(dirent.path, dirent.name), path.join(distPath, dirent.name));
    }
  });
}

