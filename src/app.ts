declare function require(x: string): any;

import { handleError, readConfig } from './utils/handler';
import FileCreator from './utils/creator';

const createdFile = process.argv[2];
export default async () => {
  if (process.argv.length < 3) {
    return handleError('生成するファイル名の記載がありません');
  }

  let configPath = `${process.cwd()}/.tecco.config.json`;
  if (process.argv[3] && process.argv[3].includes('--path=')) {
    configPath = process.argv[3].split('=')[1];
  }

  const { components, mixin } = await readConfig(configPath);
  if (!components) {
    return handleError('configファイルにcomponentsフィールドが存在しません。');
  }

  const fileCreator = new FileCreator(components, mixin, createdFile);
  fileCreator.createFiles();
};
