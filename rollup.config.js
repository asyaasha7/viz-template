import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js'
import postcss from 'rollup-plugin-postcss'
import autoPreprocess from 'svelte-preprocess';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        file: './public/bundle.js',
        format: 'es',
        sourcemap: true,
        inlineDynamicImports: true,
    },
    plugins: [
        // replace({
        //     "process.env.NODE_ENV": JSON.stringify("development")
        // }),
        postcss({
            config: {
                path: './postcss.config.cjs',
            },
            extract: 'bundle.css',
            extensions: ['.css', '.postcss'],
            minimize: true,
            inject: {
                insertAt: 'top',
            },
            plugins: [tailwindcss(tailwindConfig)],
        }),
        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
            },
            preprocess: autoPreprocess(),
            emitCss: false,
        }),
        // we'll extract any component CSS out into a separate file - better for performance
        // css({ output: 'bundle.css' }),
        alias({
            entries: [
                { find: '$', replacement: 'src' }
            ]
        }),
        // Node polyfills to make core modules work in the browser
        nodePolyfills(),

        // If you have external dependencies installed from npm, you'll most likely need these plugins.
        // In some cases you'll need additional configuration to make them work.
        resolve({
            browser: true,
            // preferBuiltins: false, // Use polyfills instead of Node.js built-ins
            dedupe: ['svelte']
        }),
        commonjs({
            include: 'node_modules/**',  // This ensures CommonJS modules in node_modules are handled
            requireReturnsDefault: 'auto',
            namedExports: {
                'react': ['ReactExports', 'createElement', 'Component', 'useState', 'useEffect', 'createContext', 'useContext'],  // If named exports are needed for React (avoid if not using React)
                'react-dom': ['render'],  // Only if react-dom is being used (again, avoid if possible)
                'node_modules/postcss/lib/postcss.js': ['default', 'parse', 'stringify'],
            },
            // dynamicRequireTargets: [
            //     'node_modules/postcss/lib/**/*.js',
            // ]
        }),
        // string({
        //     include: '**/*.html'  // Tell Rollup to import HTML files as strings
        // }),
        // In dev mode, call `npm run start` once the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}