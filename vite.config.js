import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import fse from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let sourcePath = {
    fonts:'./node_modules/@coreui/icons/fonts',
    svg:'./node_modules/@coreui/icons/svg',
    sprites:'./node_modules/@coreui/icons/sprites',
    img:'resources/sass/maxi032/laravel-admin-package/coreui/img'
};

let destinationPath = {
    fonts:'resources/sass/maxi032/laravel-admin-package/coreui/fonts',
    svg:'resources/sass/maxi032/laravel-admin-package/coreui/svg',
    sprites:'resources/sass/maxi032/laravel-admin-package/coreui/sprites',
    img:'public/assets/maxi032/laravel-admin-package/coreui/img'
};

//copy fonts from node_modules to resources/sass
for (let key in sourcePath) {
    console.log('Going to start copying the '+key);
    fse.copy(sourcePath[key], destinationPath[key])
        .then(() => console.log('success!'))
        .catch(err => console.error(err));
}


export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
                'resources/sass/maxi032/laravel-admin-package/coreui/admin_app.scss',
                'resources/js/maxi032/laravel-admin-package/coreui/admin_app.js',
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '~coreui': path.resolve(__dirname, 'node_modules/@coreui/coreui'),
        }
    },
    build: {
        rollupOptions: {
            output: {
                globals: {
                    // expose jQuery as a global variable
                    jQuery: 'jQuery'
                },
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|jpg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }

                    if (/svg|ttf|woff|woff2|eot/i.test(extType)) {
                        extType = 'fonts';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
    },
});
