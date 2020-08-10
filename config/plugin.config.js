export default config => {
    // optimize chunks
  config.optimization
  .runtimeChunk(false) // share the same chunks across different modules
  .splitChunks({
    chunks: 'async',
    name: 'vendors',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      vendors: {
        test: module => {
          const packageName = getModulePackageName(module);
          if (packageName) {
            return ['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0;
          }
          return false;
        },
        name(module) {
          const packageName = getModulePackageName(module);

          if (['bizcharts', '@antv_data-set'].indexOf(packageName) >= 0) {
            return 'viz'; // visualization package
          }
          return 'misc';
        },
      },
    },
  });
}