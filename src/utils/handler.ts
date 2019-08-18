import consola from 'consola';
import { outputFile, readJson } from 'fs-extra';

export const handleError = (message: string) => {
  handleLogger("error", message);
  throw new Error(message);
};

export const handleLogger = (type: string, message: string) => {
  const option = {
    message: message,
    badge: true
  };
  switch (type) {
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

export const createFile = async (file: string, contents: string) => {
  try {
    // wx: The file is created (if it does not exist) but fails if the path exists.
    await outputFile(file, contents, { flag: 'wx' });
    handleLogger("success", `[CREATE] ${file}`);
  } catch(err) {
    handleError(err);
  }
};

export const readConfig = async (path: string) => {
  try {
    return await readJson(path);
  } catch(err) {
    handleError(err);
  }
};