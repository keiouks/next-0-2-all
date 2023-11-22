import fs from 'fs';
import path from 'path';
// import md5 from 'crypto-js/md5.js';
import { getHash } from './posts.js';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public');
// function getHash(str) {
//   return md5(str).toString();
// }

function movePostImage2Public() {
  const dirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  dirents.filter((dirent) => (dirent.isDirectory())).forEach((dirent) => {
    const id = getHash(dirent.name);
    const subDirents = fs.readdirSync(path.join(postsDirectory, dirent.name), { withFileTypes: true });
    subDirents.filter((dirent) => (dirent.isFile())).forEach((dirent) => {
      if (['.jpg', '.jpeg', '.png', '.gif', '.ico', '.svg'].includes(path.extname(dirent.name))) {
        const distPath = path.join(publicDirectory, id);
        fs.mkdirSync(distPath, {recursive: true});
        fs.copyFileSync(path.join(dirent.path, dirent.name), path.join(distPath, dirent.name));
      }
    });
  });
}

movePostImage2Public();
