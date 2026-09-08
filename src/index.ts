import type { Element, Parent, Root } from 'hast';
import { visit } from 'unist-util-visit';

type Options = {
  position?: 'top' | 'bottom';
  marker?: string;
  removeMarker?: boolean;
};

const COUNTS = {
  top: -2,
  bottom: 2
};

export default function remarkInlineQuotes(options: Options = {}) {
  const { marker = 'table:', position = 'top', removeMarker = true } = options;
  const count = COUNTS[position];
  return (tree: Root) => {
    visit(
      tree,
      'element',
      (node: Element, index: number | undefined, parent: Parent | undefined) => {
        if (node.tagName !== 'table' || index === undefined || parent === undefined) return;
        const siblingIndex = index + count;
        const sibling = parent.children[siblingIndex];
        if (sibling?.type !== 'element' || sibling.tagName !== 'p') return;
        const [first, ...rest] = sibling.children;
        if (first?.type !== 'text') return;
        if (!first.value.startsWith(marker)) return;
        if (removeMarker) first.value = first.value.replace(marker, '').trimStart();
        node.children.unshift({
          type: 'element',
          tagName: 'caption',
          children: [first, ...rest],
          properties: {}
        });
        parent.children.splice(siblingIndex, 1);
      }
    );
  };
}
