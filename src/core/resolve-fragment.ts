// Copyright (c) Bruno Sales <me@baliestri.dev>. Licensed under the MIT License.
// See the LICENSE file in the repository root for full license text.

import { FileSystem } from "@parcel/fs";

/**
 * Find a matching file.
 *
 * @param {FileSystem} fs The file system.
 * @param {string} directory The directory.
 * @param {string} filename The filename.
 * @returns {Promise<string | undefined>} The matching file.
 */
async function resolveFragment(fs: FileSystem, directory: string, filename: string): Promise<string | undefined> {
  const files = await fs.readdir(directory);
  return files.find((match) => match.startsWith(filename));
}

export { resolveFragment };
