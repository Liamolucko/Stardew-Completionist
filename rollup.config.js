import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import autoPreprocess from 'svelte-preprocess';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			alias({
				resolve: ['.svelte', '.js', '.scss', '.css'],
				entries: [
					{
						find: /^@smui\/([^\/]+)$/,
						replacement: path.resolve(
							__dirname,
							'node_modules',
							'@smui',
							'$1',
							'index.js'
						)
					},
					{
						find: /^@smui\/([^\/]+)\/(.*)$/,
						replacement: path.resolve(__dirname, 'node_modules', '@smui', '$1', '$2')
					},
					{ find: 'static', replacement: path.resolve(__dirname, 'static') },
				]
			}),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			url({
				sourceDir: path.resolve(__dirname, 'static'),
				publicPath: '/client/'
			}),
			svelte({
				preprocess: autoPreprocess(),
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			postcss({
				extensions: ['.scss', '.sass'],
				extract: false,
				minimize: true,
				use: [
					[
						'sass',
						{
							includePaths: [
								'./src/theme',
								'./node_modules',
								path.resolve(__dirname, '..', 'node_modules')
							]
						}
					]
				]
			}),
			typescript(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			alias({
				resolve: ['.svelte', '.js', '.scss', '.css'],
				entries: [
					{
						find: /^@smui\/([^\/]+)$/,
						replacement: path.resolve(
							__dirname,
							'node_modules',
							'@smui',
							'$1',
							'index.js'
						)
					},
					{
						find: /^@smui\/([^\/]+)\/(.*)$/,
						replacement: path.resolve(__dirname, 'node_modules', '@smui', '$1', '$2')
					},
					{ find: 'static', replacement: path.resolve(__dirname, 'static') },
				]
			}),
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				preprocess: autoPreprocess(),
				generate: 'ssr',
				dev
			}),
			url({
				sourceDir: path.resolve(__dirname, 'static'),
				publicPath: '/client/',
				emitFiles: false // already emitted by client build
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs(),
			postcss({
				extensions: ['.scss', '.sass'],
				extract: false,
				minimize: true,
				use: [
					[
						'sass',
						{
							includePaths: [
								'./src/theme',
								'./node_modules',
								path.resolve(__dirname, '..', 'node_modules')
							]
						}
					]
				]
			}),
			typescript()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		preserveEntrySignatures: false,
		onwarn,
	}
};
