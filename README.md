# rehype-table-caption

A remark plugin to use table captions.

# Install

```sh
npm i remark-gfm rehype-table-caption
```

⚠️ [`remark-gfm`](https://www.npmjs.com/package/remark-gfm) is required to use tables.

## Use

```ts
import rehypeStringify from "rehype-stringify";
import rehypeTableCaptions from "rehype-table-captions";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const md2html = (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeTableCaptions)
    .use(rehypeStringify)
    .processSync(markdown);
```

Write marker (`table:`) and following content before (or after) tables. Caption position and marker are configuable.

Input:

```md
table: Table Caption _width_ **elements**

| key  | value |
| ---- | ----- |
| foo  | bar   |
| foo1 | bar2  |
```

Output:

```html
<table>
  <caption>Table Caption <em>with</em> <strong>elements</strong></caption>
  <thead>
  <tr>
  <th>key</th>
  <th>value</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td>foo</td>
  <td>bar</td>
  </tr>
  <tr>
  <td>foo1</td>
  <td>bar2</td>
  </tr>
  </tbody>
  </table>
```

## Config

```
unified().use(rehypeTableCaptions[, options])
```

```ts
type Options = {
  marker?: string;
  position?: "top" | "bottom";
  removeMarker?: boolean;
};
```

### `marker`

Text before captions. Following content of this will be caption content. Space(s) between marker and content will be ignored.

Default: `table:`

### `position`

Caption posision in Markdown. Regardless of this option, generated captions will be first child of tables.

Default: `'top'`

### `removeMarker`

Whether remove marker text in caption. If `false`, marker configured with `marker` will remainning.

Default: `true`
