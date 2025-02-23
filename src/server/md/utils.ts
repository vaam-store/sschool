import matter from 'gray-matter';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as process from 'node:process';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

// Use remark to convert markdown into HTML string
const processor = unified()
  .use(remarkGfm)
  .use(remarkGithub)
  .use(remarkRehype)
  .use(remarkParse)
  .use(rehypeExternalLinks, { rel: ['nofollow'], target: '_blank' })
  .use(rehypeStringify);

export async function loadDocMd(
  res: 'res' = 'res',
  slug: string,
): Promise<Record<string, string>> {
  const fullPath = path.join(process.cwd(), 'docs', res, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await processor.process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

export async function loadRes(slug: string): Promise<Record<string, string>> {
  return loadDocMd('res', slug);
}
