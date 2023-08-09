import 'dotenv/config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

export default (env, option) => {
	const isDevelopment = option.mode === 'development';

	const _filename = fileURLToPath(import.meta.url);
	const __root = dirname(_filename);

	return {
		entry: join(__root, '..', './src/index.tsx'),
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.scss'],
			alias: {
				_assets: join(__root, '..', './src/assets'),
				_redux: join(__root, '..', './src/redux'),
				src: join(__root, '..', './src/')
			}
		},

		output: {
			publicPath: '/',
			path: join(__root, '..', './build'),
			filename: 'index.js',
			chunkFilename: 'js/[name].chunk.js'
		},
		devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',

		module: {
			rules: [
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader'
						}
					]
				},
				{
					test: /\.(s(a|c)ss)$/,
					exclude: /\.module\.scss$/,
					use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.module\.scss$/,
					use: [
						isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: isDevelopment
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isDevelopment
							}
						}
					]
				},

				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					type: 'asset/resource',
					generator: {
						filename: 'icons/[hash][ext]'
					},
					resourceQuery: /url/ // *.svg?url
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					type: 'asset/source',
					resourceQuery: /source/ // *.svg?source
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					resourceQuery: { not: [/url|source/] }, // exclude react component if *.svg?url and *.svg?source
					use: ['@svgr/webpack']
				},

				{
					test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][contenthash][ext]'
					}
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf|)$/,
					type: 'asset/inline'
				}
			]
		},

		plugins: [
			new webpack.DefinePlugin({
				'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN)
			}),

			new HtmlWebpackPlugin({
				template: join(__root, '..', './public/index.html'),
				filename: 'index.html',
				favicon: join(__root, '..', './src/assets/images/favicon.png'),
				templateParameters: {
					domain: process.env.DOMAIN
				}
			}),
			...(isDevelopment
				? []
				: [
						new MiniCssExtractPlugin({
							filename: 'css/[name][contenthash].css',
							chunkFilename: 'css/[id].css'
						})
				  ])
		],

		...(isDevelopment
			? {
					devServer: {
						historyApiFallback: true,
						port: process.env.APP_PORT || 3000
					}
			  }
			: {}),
		stats: 'errors-only'
	};
};
