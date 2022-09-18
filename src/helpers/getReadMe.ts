import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export default async function getReadMe() {
  const source = fs.readFileSync(path.join(process.cwd(), 'README.md'));
  const { content } = matter(source);
  return serialize(content);
}
