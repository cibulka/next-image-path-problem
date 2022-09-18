import { NextApiRequest, NextApiResponse } from 'next';

import getPostOnServer from 'src/helpers/getPostOnServer';
import { BlogPost } from 'src/types';

export default function getBlog(
  req: NextApiRequest,
  res: NextApiResponse<BlogPost | { error: string }>,
) {
  const index = typeof req.query.index === 'string' ? parseInt(req.query.index) : null;
  if (!index) throw new Error('Need page number');

  try {
    const post = getPostOnServer(index);
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send({ error: (e as any)?.message || 'Unknown error' });
  }
}
