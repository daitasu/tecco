import consola from 'consola';

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