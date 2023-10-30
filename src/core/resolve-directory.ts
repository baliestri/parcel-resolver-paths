// Copyright (c) Bruno Sales <me@baliestri.dev>. Licensed under the MIT License.
// See the LICENSE file in the repository root for full license text.

import path from "path";

import { md } from "@parcel/diagnostic";
import { FileSystem } from "@parcel/fs";
import { ResolveResult } from "@parcel/types";

/**
 * Resolve a directory.
 *
 * @param {FileSystem} fs The file system.
 * @param {string} projectRoot The project root.
 * @param {string} directory The directory.
 * @param {string} fragment The fragment.
 * @returns {Promise<ResolveResult>} The resolve result.
 */
async function resolveDirectory(
  fs: FileSystem,
  projectRoot: string,
  directory: string,
  fragment: string
): Promise<ResolveResult> {
  const file = await fs.readdir(path.join(directory, fragment));
  const index = file.find((match) => match.startsWith("index"));

  if (!index) {
    return {
      diagnostics: [
        {
          message: md([`Failed to resolve path: **${fragment}**. No index file found.`]),
          origin: "@baliestri/parcel-resolver-paths"
        }
      ]
    };
  }

  return {
    filePath: path.join(projectRoot, directory, fragment, index)
  };
}

export { resolveDirectory };
