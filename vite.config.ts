import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'public',
    assetsDir: 'assets', 
    emptyOutDir: true, 
  },

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/models/*.{glb,fbx}', 
          dest: 'assets/models', 
        },
        {
          src: 'src/assets/exercises/*.{png,jpg,webp}',
          dest: 'assets/exercises', 
        },
        {
          src: 'src/assets/glbPreviews/*.{png,jpg,svg}',
          dest: 'assets/glbPreviews', 
        },
        {
          src: 'src/assets/tutorial/avatar/*.{png,jpg}',
          dest: 'assets/tutorial/avatar', 
        },
        {
          src: 'src/assets/tutorial/catalogue/*.{png,jpg}',
          dest: 'assets/tutorial/catalogue', 
        },
        {
          src: 'src/assets/tutorial/profile/*.{png,jpg}',
          dest: 'assets/tutorial/profile', 
        },
        {
          src: 'src/assets/tutorial/savedTrainings/*.{png,jpg}',
          dest: 'assets/tutorial/savedTrainings', 
        },
        {
          src: 'src/assets/tutorial/training/*.{png,jpg}',
          dest: 'assets/tutorial/training', 
        },
        {
          src: 'src/assets/tutorial/trainingConstructor/*.{png,jpg}',
          dest: 'assets/tutorial/trainingConstructor', 
        },
        {
          src: 'src/assets/logo/*.{png,svg}',
          dest: 'assets/logo', 
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',

    },
  },


  publicDir: 'public', 
  assetsInclude: ['**/*.glb', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg',]
})
