import { mdProcessor } from './converter';

export async function markdownToEditorJS(mdContent: string) {
  try {
    const result = await mdProcessor.process(mdContent);

    const html = result.value;

    // Simple HTML parsing and block conversion (VERY BASIC)
    const blocks = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    for (let i = 0; i < body.children.length; i++) {
      const child = body.children[i];

      if (
        child.tagName === 'H1' ||
        child.tagName === 'H2' ||
        child.tagName === 'H3' ||
        child.tagName === 'H4' ||
        child.tagName === 'H5' ||
        child.tagName === 'H6'
      ) {
        blocks.push({
          type: 'header',
          data: {
            text: child.textContent,
            level: parseInt(child.tagName.substring(1)),
          },
        });
      } else if (child.tagName === 'P') {
        blocks.push({
          type: 'paragraph',
          data: {
            text: child.textContent,
          },
        });
      } else if (child.tagName === 'UL' || child.tagName === 'OL') {
        const listItems = Array.from(child.children).map(
          (li) => li.textContent,
        );
        blocks.push({
          type: 'list',
          data: {
            style: child.tagName === 'UL' ? 'unordered' : 'ordered',
            items: listItems,
          },
        });
      } else if (child.tagName === 'A') {
        blocks.push({
          type: 'linkTool', // You'll likely need a custom tool for this
          data: {
            link: child.href,
            meta: {
              title: child.textContent, // May need a more robust title extraction
            },
          },
        });
      } else if (child.tagName === 'IMG') {
        blocks.push({
          type: 'image', // You'll likely need a custom tool for this
          data: {
            file: {
              url: child.src,
            },
            caption: child.alt,
          },
        });
      } else if (child.tagName === 'BLOCKQUOTE') {
        blocks.push({
          type: 'quote',
          data: {
            text: child.textContent,
          },
        });
      } else {
        blocks.push({
          type: 'paragraph',
          data: {
            text: child.textContent,
          },
        });
      }
    }

    return { blocks };
  } catch (error) {
    console.error('Error converting Markdown to Editor.js blocks:', error);
    return null;
  }
}
