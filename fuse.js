const {FuseBox, CopyPlugin} = require('fuse-box');

const fuse = FuseBox.init({
  homeDir: 'src',
  output: 'dist/$name.js',
  sourceMaps: true,
  globals: { "p5": "p5" },
  plugins: [
    CopyPlugin({
      files: ['.jpg', '.png']
    })
  ]
});

fuse.dev({open : true});

fuse.bundle('main')
  .instructions('> main.ts +p5')
  .hmr({reload: true})
  .watch()

fuse.run();