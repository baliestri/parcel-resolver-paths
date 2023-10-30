// Copyright (c) Bruno Sales <me@baliestri.dev>. Licensed under the MIT License.
// See the LICENSE file in the repository root for full license text.

type ResolvedPath = {
  key: string;
  value: string;
};

/**
 * Resolve paths from a paths object.
 *
 * @param {Record<string, string[]>} paths The paths object.
 * @param {string} specifier The specifier to be resolved.
 * @returns {ResolvedPath | null} The resolved path or null.
 */
function resolvePaths(paths: Record<string, string[]>, specifier: string): ResolvedPath | null {
  const keys = Object.keys(paths);

  for (const key of keys) {
    const value = paths[key] || [];

    if (value.length === 0) {
      continue;
    }

    const regex = new RegExp(key.replace("*", "(.*)"));

    if (regex.test(specifier)) {
      const match = specifier.match(regex);

      if (match) {
        const [, ...groups] = match;

        const resolved = value[0]!.replace("*", groups.join(""));

        return {
          key,
          value: resolved
        };
      }
    }
  }

  return null;
}

export { resolvePaths };
