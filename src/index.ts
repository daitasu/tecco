#!/usr/bin/env node

declare function require(x: string): any;

import * as fs from 'fs';
import consola from 'consola';
import { promisify } from 'util';
import { vueTemplate } from './templates/vueTemplate';
import { mixinTemplate } from './templates/mixinTemplate';
import { specTemplate } from './templates/specTemplate';

const stat = promisify(fs.stat);
const getStats = async () => {
  try {
    const stats = await stat('.tecco.config.json');
    return stats.uid;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
  }
};

const handleError = (message: string) => {
  handleLogger("error", message);
  throw new Error(message);
};

const handleLogger = (type: string, message: string) => {
  const option = {
    message: message,
    badge: true
  };
  switch(type) {
    case "success":
      consola.success(option);
      break;
    case "error":
      consola.error(option);
      break;
    case "info":
      consola.info(option);
      break;
    default:
      consola.log(option);
  }
}

const createVue = (path: string, fileName: string, mixinPath: string = '') => {
  if (!path) {
    handleError('components配下にpathフィールドが存在しません。');
  }

  fs.writeFile(`${path}/${fileName}.vue`, vueTemplate(fileName, mixinPath), err => {
    if (err) return handleError(err.message);
    handleLogger("success", `[CREATE] ${path}/${fileName}.vue`);
  });
};

const createTest = (path: string, fileName: string, testPath: string = "") => {
  if (!path) {
    handleError('components配下にpathフィールドが存在しません。');
  }
  const filePath = testPath ? testPath : path;
  fs.writeFile(`${filePath}/${fileName}.spec.js`, specTemplate(fileName), err => {
    if (err) return handleError(err.message);
    handleLogger("success", `[CREATE] ${filePath}/${fileName}.spec.js`);
  });
}

const createMixin = (path: string, fileName: string) => {
  if (!path) {
    handleError('mixin配下にpathフィールドが存在しません。');
  }
  fs.writeFile(`${path}/${fileName}.js`, mixinTemplate(), err => {
    if (err) return handleError(err.message);
    handleLogger("success", `[CREATE] ${path}/${fileName}.js`);
  });
}

const createdFileName = process.argv[2];
const main = async () => {
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
  for (const component of components) {
    if (!component.path) {
      return handleError('componentsオブジェクトにpathフィールドが存在しません。');
    }
    createVue(component.path, createdFileName, mixin.path);
    if (component.test) {
      createTest(component.path, createdFileName, component.testPath);
    }
  }
  if (mixin && mixin.path) {
    createMixin(mixin.path, createdFileName);
    if (mixin.test) {
      createTest(mixin.path, createdFileName, mixin.testPath);
    }
  }
};

main();
