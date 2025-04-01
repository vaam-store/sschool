import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const mdProcessor = unified()
  .use(remarkGfm)
  .use(remarkGithub)
  .use(remarkRehype)
  .use(remarkParse)
  .use(rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' })
  .use(rehypeStringify);
