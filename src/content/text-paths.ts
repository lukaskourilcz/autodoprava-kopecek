// Helpers for reading and writing text at a dynamic path inside the SiteTexts
// tree. The /dev text editor walks the tree generically, so it needs to get and
// set values by an array path like ["about", "paragraphs", 0].

export type PathSegment = string | number;

type AnyObject = { [key: string]: unknown };

export function getAtPath(root: unknown, path: PathSegment[]): unknown {
  let node: unknown = root;
  for (const segment of path) {
    if (node == null) return undefined;
    node = (node as AnyObject)[segment as string];
  }
  return node;
}

/** Mutates `root` in place — only ever called on a fresh draft copy. */
export function setAtPath(root: unknown, path: PathSegment[], value: unknown): void {
  let node = root as AnyObject;
  for (let i = 0; i < path.length - 1; i++) {
    node = node[path[i] as string] as AnyObject;
  }
  node[path[path.length - 1] as string] = value;
}

/** Build an empty version of a sample value, used when adding a new array item. */
export function blankLike(sample: unknown): unknown {
  if (typeof sample === "string") return "";
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === "object") {
    const result: AnyObject = {};
    for (const [key, value] of Object.entries(sample)) {
      // "icon" is a structural choice (which Lucide icon), so keep the sample's.
      result[key] = key === "icon" ? value : blankLike(value);
    }
    return result;
  }
  return sample;
}

/** "addressLine1" -> "Address line1", "heroText" -> "Hero text". */
export function humanizeKey(key: string): string {
  const spaced = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
