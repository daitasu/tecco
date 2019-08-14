declare function require(x: string): any;

import * as fs from 'fs';
import { promisify } from 'util';
import { handleError } from './utils/handler';
import FileCreator from './utils/creator';

const stat = promisify(fs.stat);
const getStats = async () => {
  try {
    const stats = await stat('.tecco.config.json');
    return stats.uid;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
};

const createdFileName = process.argv[2];
export default async () => {
  if (process.argv.length < 3) {
    return handleError('生成するファイル名の記載がありません');
  }
  const hasFile = await getStats();

  if (!hasFile) {
    return handleError('configファイルが見つかりません');
  }
  const { components, mixin } = require('../.tecco.config.json');
  if (!components) {
    return handleError('configファイルにcomponentsフィールドが存在しません。');
  }

  const fileCreator = new FileCreator(components, mixin, createdFileName);
  fileCreator.createFiles();
};