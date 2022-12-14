import { forEachRight } from './forEachRight';

export function findTree<T>(
  iteratee: (node: T) => boolean | void,
  tree: T[],
  childrenKey: string = 'children'
): T | null {
  const stack: T[] = [];

  forEachRight((item) => {
    stack.push(item);
  }, tree);

  while (stack.length) {
    const node: any = stack.pop()!;

    if (iteratee(node)) {
      return node;
    }

    if (Array.isArray(node[childrenKey])) {
      forEachRight((item) => {
        stack.push(item);
      }, node[childrenKey] as T[]);
    }
  }

  return null;
}
