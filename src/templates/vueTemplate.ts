

export const vueTemplate = (fileName: string, mixinPath: string = '') =>
`<template>
  <div></div>
</template>

<script>
${mixinImport(fileName, mixinPath)}

export default {
  name: '${fileName}',
  mixin: [${mixinPath ? fileName : ''}]
}
</script>

<style lang="scss" scoped>
</style>
`;

const mixinImport = (fileName: string, mixinPath: string) => {
  return mixinPath ? `import ${fileName} from '~/${mixinPath}/${fileName}'` : '';
};