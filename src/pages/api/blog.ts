import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

import getPostOnServer from 'src/helpers/getPostOnServer';
import { BlogPost } from 'src/types';

export default function getBlog(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost | { error: string }>,
) {
  const index = typeof req.query.index === 'string' ? parseInt(req.query.index) : null;
  if (!index) throw new Error('Need page number');

  try {
    /* If we don't do this, Vercel removes `db` folder which results to ENOENT error */
    const purgePath = path.join(process.cwd(), 'db');
    fs.readFileSync(purgePath + '/dontpurgeme.json');
    /* End of preventing purge */

    const post = getPostOnServer(index);
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ error: (e as any)?.toString() || 'Unknown error' });
  }
}
