/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import {normalizePath} from './navigation.utils';
type FileAndContent = any;

interface DirEnt<T> {
  name: T;
  isFile(): boolean;
  isDirectory(): boolean;
}

interface FileSystemAPI {
  readdir(
    path: string,
    options: {
      encoding?: BufferEncoding | null;
      withFileTypes: true;
    },
  ): Promise<DirEnt<string>[]>;
  readFile(path: string, encoding?: string): Promise<string>;
}

export const checkFilesInDirectory = async (
  dir: string,
  fs: FileSystemAPI,
  filterFoldersPredicate: (path?: string) => boolean = () => true,
  files: FileAndContent[] = [],
) => {
  const entries = (await fs.readdir(dir, {withFileTypes: true})) ?? [];

  for (const entry of entries) {
    const fullPath = normalizePath(`${dir}/${entry.name}`);

    if (entry.isFile()) {
      const content = await fs.readFile(fullPath, 'utf-8');
      files.push({content, path: fullPath});
    } else if (entry.isDirectory() && filterFoldersPredicate(entry.name)) {
      await checkFilesInDirectory(fullPath, fs, filterFoldersPredicate, files);
    }
  }

  return files;
};
