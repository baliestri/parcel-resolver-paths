// Copyright (c) Bruno Sales <me@baliestri.dev>. Licensed under the MIT License.
// See the LICENSE file in the repository root for full license text.

import path from "path";

import { md } from "@parcel/diagnostic";
import { Resolver } from "@parcel/plugin";

import { resolveDirectory } from "./core/resolve-directory";
import { resolveFragment } from "./core/resolve-fragment";
import { resolvePaths } from "./core/resolve-paths";

export default new Resolver({
  async loadConfig({ options }) {
    const { projectRoot } = options;
    const fs = options.inputFS;

    let configPath = path.join(projectRoot, "tsconfig.json");

    if (!(await fs.exists(configPath))) {
      configPath = path.join(projectRoot, "jsconfig.json");
    }

    if (!(await fs.exists(configPath))) {
      return null;
    }

    const configContent = await fs.readFile(configPath, "utf8");
    const config = JSON.parse(configContent);

    return config;
  },
  async resolve({ config, options, specifier }) {
    if (!config) {
      return {
        filePath: specifier
      };
    }

    const { projectRoot } = options;
    const fs = options.inputFS;

    const baseUrl = config.compilerOptions.baseUrl || ".";
    const paths = config.compilerOptions.paths || {};

    const resolvedPath = resolvePaths(paths, specifier);

    if (!resolvedPath) {
      return {
        diagnostics: [
          {
            message: md([`Failed to resolve path: **${specifier}**. No match found.`]),
            origin: "@baliestri/parcel-resolver-paths"
          }
        ]
      };
    }

    const { value } = resolvedPath;
    const resolved = path.join(baseUrl, value);
    const { dir } = path.parse(resolved);
    const { base } = path.parse(value);

    const fragment = await resolveFragment(fs, dir, base);

    if (!fragment) {
      return {
        diagnostics: [
          {
            message: md([`Failed to resolve path: **${specifier}**. No match found.`]),
            origin: "@baliestri/parcel-resolver-paths"
          }
        ]
      };
    }

    const stat = await fs.stat(path.join(dir, fragment));

    if (stat.isDirectory()) {
      return await resolveDirectory(fs, projectRoot, dir, fragment);
    }

    const { ext } = path.parse(fragment);

    return {
      filePath: path.resolve(projectRoot, `${value}${ext}`)
    };
  }
});
