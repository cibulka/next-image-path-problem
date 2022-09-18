I need to get image dimensions from an API route of Next.js. Locally (both with npm run dev and npm run build && npm start) this (pseudo) code works:

```
import path from 'path';
import imageSize from 'image-size';

export default async function ApiEndpoint(req: NextApiRequest, res: NextApiResponse) {
const { width, height } = imageSize(path.join('./public', photo));
... other things
}
```

On Vercel however it does not and I get this error:

```
Error: ENOENT: no such file or directory, open '/var/task/public/stories/tatiana.jpeg'
```

I've tried variations of the path (such as 'public', './public', '/public' or omitting "public") to no avail.

Is there a recommended way how to read a file dynamically (not with import) in the API route of Next.js hosted on Vercel?

Thanks in advance!

## File in question

This file: [src/helpers/getPostOnServer.ts](https://github.com/cibulka/next-image-path-problem/blob/main/src/helpers/getPostOnServer.ts).

- ✅ locally on `npm run dev`
- ✅ locally on `npm start`
- ✅ in `getStaticProps` - locally and on Vercel
- ✅ when called on endpoint `/api/blog`, but _only locally_
- ❌ when called on endpoint `/api/blog` on Vercel

## To reproduce locally

```
npm install
npm run dev
```

```
npm install
npm start
```

Click the "load more" button bellow the first post. Should work both in development and production mode.

## To see on Vercel

This link: [vercel.app]().

Click the "load more" button bellow the first post. Width and height should appear as 0 (as the error was caught).
