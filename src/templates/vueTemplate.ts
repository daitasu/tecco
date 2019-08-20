
export const vueTemplate = (fileName: string, filePath: string, mixinPath: string = '') =>
`<template>
  <div></div>
</template>

<script>
${mixinPath ? `import ${fileName} from '~/${mixinPath}/${filePath}${fileName}'` : ''};

export default {
  name: '${fileName}',
  mixin: [${mixinPath ? fileName : ''}]
}
</script>

<style lang="scss" scoped>
</style>
`;
