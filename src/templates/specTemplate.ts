export const specTemplate = (fileName: string) =>
`// TODO: specファイルの作成
describe('${fileName}', () => {
  test.skip('skip', () => {});
});
`;