// https://github.com/michael-ciniawsky/postcss-load-config
// 移动端布局使用postcss-px-to-viewport，vm无法设置最小最大宽高，设置最小最大宽高使用rem

module.exports = {
	"plugins": {
		"postcss-import": {},
		"postcss-url": {},
		"postcss-aspect-ratio-mini": {},
		"postcss-write-svg": {     // 处理移动端1px的解决方案
			utf8: false
		},
		"postcss-cssnext": {},
		"postcss-px-to-viewport": {
			viewportWidth: 750,     // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
			viewportHeight: 1334,   // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
			unitPrecision: 3,       // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
			viewportUnit: 'vw',     // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
			selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
			minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
			mediaQuery: false       // 允许在媒体查询中转换`px`,设置为true，媒体查询不可用
		},
		"cssnano": {
			preset: "advanced",
			autoprefixer: false,
			"postcss-zindex": false
		},
	}
}
