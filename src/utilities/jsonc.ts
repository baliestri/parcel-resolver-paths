// Copyright (c) Bruno Sales <me@baliestri.dev>. Licensed under the MIT License.
// See the LICENSE file in the repository root for full license text.

import ThrowableDiagnostic, { md } from "@parcel/diagnostic";
import JSONC, { ParseError } from "jsonc-parser";

/**
 * Parse JSONC content.
 *
 * @param {string} content The content to be parsed.
 * @returns {Record<string, unknown>} The parsed content.
 * @throws {ThrowableDiagnostic} If the content is not valid JSONC.
 */
const parseJSONC = (content: string): Record<string, unknown> => {
  const errors: ParseError[] = [];

  const result = JSONC.parse(content, errors, {
    allowTrailingComma: true
  });

  if (errors.length > 0) {
    const { error: errorCode, offset } = errors[0] as ParseError;
    const errName = JSONC.printParseErrorCode(errorCode);

    throw new ThrowableDiagnostic({
      diagnostic: {
        message: md([`Failed to parse JSONC: **${errName}** at position **${offset}**`]),
        origin: "@baliestri/parcel-resolver-paths"
      }
    });
  }

  return result;
};

export { parseJSONC };
