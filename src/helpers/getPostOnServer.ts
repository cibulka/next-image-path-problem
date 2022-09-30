import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';

import { BlogPost } from 'src/types';

export default function getPostOnServer(index: number): BlogPost {
  const data: any[] = JSON.parse(fs.readFileSync('./db/blog/articles.json', 'utf-8'));
  const item = data[index];
  if (!item) throw new Error('Item under index not found');

  let width: number = 0;
  let height: number = 0;

  const photoPath = path.join(process.cwd(), '/public', item.image);

  try {
    const photoSize = imageSize(photoPath);
    if (photoSize.width && photoSize.height) {
      width = photoSize.width;
      height = photoSize.height;
      console.log(photoPath, 'this photoPath works');
    }
  } catch (e) {
    console.error(e);
    console.log(photoPath, 'this photoPath does not work');
  }

  return {
    title: item.title,
    image: item.image,
    width,
    height,
    path: photoPath,
  };
}
