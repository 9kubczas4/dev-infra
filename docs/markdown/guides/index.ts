/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {readFileSync, writeFileSync} from 'fs';
import path from 'path';
import {parseMarkdown} from './parse';

async function main() {
  const [paramFilePath] = process.argv.slice(2);
  const rawParamLines = readFileSync(paramFilePath, {encoding: 'utf8'}).split('\n');
  const [srcs, outputFilenameExecRootRelativePath] = rawParamLines;

  for (const filePath of srcs.split(',')) {
    console.log(filePath);
    if (!filePath.endsWith('.md')) {
      throw new Error(`Input file "${filePath}" does not end in a ".md" file extension.`);
    }

    const markdownContent = readFileSync(filePath, {encoding: 'utf8'});
    const htmlOutputContent = await parseMarkdown(markdownContent);

    const htmlFileName = filePath.substring(0, filePath.length - '.md'.length) + '.html';
    const htmlOutputPath = path.join(outputFilenameExecRootRelativePath, htmlFileName);

    writeFileSync(htmlOutputPath, htmlOutputContent, {encoding: 'utf8'});
  }
}

main();
