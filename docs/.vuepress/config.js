module.exports = {
	base: '/personnal-blog/',
	title: 'fieemiracle的博客',
	description: '纸上得来终觉浅，绝知此事要躬行~',
	theme: 'reco',
	dest: "public",
	head: [
		[
			"link",
			{
				"rel": "icon",
				"href": "/favicon.ico"
			}
		],
		[
			"meta",
			{
				"name": "viewport",
				"content": "width=device-width,initial-scale=1,user-scalable=no"
			}
		]
	],
	themeConfig: {
		// 导航条
		nav: [{
				text: "首页",
				link: "/",
				icon: "reco-home"
			},
			{
				text: "时间线",
				link: "/timeline/",
				icon: "reco-date"
			},
			{
				text: "简历",
				icon: "reco-message",
				items: [{
					text: "我的简历",
					link: "/views/Resume/resume"
				}]
			},
			{
				text: "关于",
				icon: "reco-message",
				items: [{
						text: "Gitee",
						link: "https://gitee.com/fieemiracle",
						icon: "reco-mayun"
					},
					{
						text: "Leetcode",
						link: "https://leetcode.cn/u/fieemiracle/",
						icon: "reco-coding"
					},
					{
						text: "稀土掘金",
						link: "https://juejin.cn/user/3316551988553709/posts",
						icon: "reco-juejin"
					},
					{
						text: "Github",
						link: "https://github.com/fieemiracle",
						icon: "reco-github"
					},
					{
						text: "CSDN",
						link: "https://mp.csdn.net/mp_blog/manage/article?spm=1010.2135.3001.5448",
						icon: "reco-csdn"
					}
				]
			}
		],
		// keyPage: {
		// 	keys: ['bd39f68d7537eea77c3ab78ac16ab2ca'], // 1.3.0 版本后需要设置为密文
		// 	color: '#42b983', // 登录页动画球的颜色
		// 	lineColor: '#42b983' // 登录页动画线的颜色
		// },
		subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
		sidebar: "auto", //所有页面自动生成侧边栏
		// sidebarDepth: 4,
		type: "blog",
		smooth: "true", //平滑滚动
		blogConfig: {
			category: {
				location: 2,
				text: "目录"
			},
			tag: {
				location: 3,
				text: "标签"
			}
		},
		friendLink: [{
				title: "午后南杂",
				desc: "Enjoy when you can, and endure when you must.",
				email: "1156743527@qq.com",
				link: "https://www.recoluan.com"
			},
			{
				title: "vuepress-theme-reco",
				desc: "A simple and beautiful vuepress Blog & Doc theme.",
				avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
				link: "https://vuepress-theme-reco.recoluan.com"
			}
		],
		// 发表评论
		valineConfig: {
			appId: 'OcpE2k26zVB0L3vtcpYl0uPK-gzGzoHsz', // your appId
			appKey: 'rp6d1uq9qMATS2zJnuviZ3ZS', // your appKey
			showComment: false,
			placeholder: '发表评论~',
			visitor: true,
			avatarForce: true,
			avatar: 'monsterid'
		},
		locales: {
			'/': {
				recoLocales: {
					homeBlog: {
						lang: 'zh-CN',
						article: '美文', // 默认 文章
						tag: '标识', // 默认 标签
						category: '类别', // 默认 分类
						friendLink: '友链' // 默认 友情链接
					},
					pagation: {
						prev: '上一页',
						next: '下一页',
						go: '前往',
						jump: '跳转至'
					}
				}
			},
			'/en/': {
				recoLocales: {
					homeBlog: {
						lang: 'en-US',
						article: 'articles', // 默认 文章
						tag: 'tags', // 默认 标签
						category: 'categories', // 默认 分类
						friendLink: 'friendLink' // 默认 友情链接
					},
					pagation: {
						prev: 'previous page',
						next: 'next page',
						go: 'travel to',
						jump: 'jump to'
					}
				}
			}
		},
		// logo: "/avatar.jpg",
		displayAllHeaders: true,
		search: true,
		// searchMaxSuggestions: 10,
		lastUpdated: "Last Updated",
		author: "fieemiracle",
		authorAvatar: "/avatar.jpg",
		record: "xxxx",
		startYear: "2022"
	},
	// markdown显示行数
	markdown: {
		lineNumbers: true
	},
	// 插件
	plugins: [
		// 设置评论功能
		[
			"@vuepress-reco/vuepress-plugin-comments",
			{
				theme: ["miku"],
				clean: true,
				modelStyle: {
					position: "fixed",
					left: "0px",
					bottom: "0px",
					opacity: "0.9",
					zIndex: 99999
				}
			}
		],
		["reading-progress", true],
		["vuepress-plugin-code-copy", true],
		// [
		// 	'@vuepress/last-updated',
		// 	{
		// 		transformer: (timestamp, lang) => {
		// 			moment.locale(lang)
		// 			return moment(timestamp).format("LLLL")
		// 		}
		// 	}
		// ],
		[
			'@vuepress/medium-zoom', {
				selector: 'img',
				// medium-zoom options here
				// See: https://github.com/francoischalifour/medium-zoom#options
				options: {
					margin: 16
				}
			}
		],
		// 设置搜索内容最大数目
		['@vuepress/search', {
			searchMaxSuggestions: 10
		}],
		// 设置板娘
		["@vuepress-reco/vuepress-plugin-kan-ban-niang", {
			theme: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku',
				'wanko', 'miku'
			],
			clean: false,
			messages: {
				welcome: '我是bookbook,欢迎你的关注 ',
				home: '心里的花，我想要带你回家。',
				theme: '好吧，希望你能喜欢我的其他小伙伴。',
				close: '再见哦'
			},
			width: 150,
			height: 219,
		}, ],
		// 音乐盒
		["@vuepress-reco/vuepress-plugin-bgm-player", {
			audios: [{
					name: "Faster Than Light",
					artist: "Andreas Waldetoft / Mia Stegmar",
					url: "https://assets.smallsunnyfox.com/music/2.mp3",
					cover: "https://p1.music.126.net/Gxv6d9W4Yd9q9WNHPpi8rw==/1379887104073348.jpg",
				},
				{
					name: "有何不可",
					artist: "许嵩",
					url: "http://music.163.com/song/media/outer/url?id=167876.mp3",
					cover: "http://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg?param=130y130",
				},
				{
					name: "多远都要在一起",
					artist: "G.E.M.邓紫棋",
					url: "http://music.163.com/song/media/outer/url?id=30612793.mp3",
					cover: "http://p1.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg?param=130y130",
				},
				{
					name: "悔过",
					artist: "王贰浪",
					url: "http://music.163.com/song/media/outer/url?id=1809760190.mp3",
					cover: "http://p2.music.126.net/o4FJ43VDbkAwGUtbhtEB1Q==/109951165609167257.jpg?param=130y130",
				},
				{
					name: '年少',
					artist: '碳酸男孩',
					url: 'http://music.163.com/song/media/outer/url?id=1455249591.mp3',
					cover: 'http://p2.music.126.net/kSXV6wvns5e-UqRezbsOlg==/109951165060425436.jpg?param=130y130'
				},
				{
					name: '底气',
					artist: '王巨星',
					url: 'http://music.163.com/song/media/outer/url?id=1955692430.mp3',
					cover: 'http://p1.music.126.net/z7fL1WqTZaECzol83FBNZA==/109951167547733759.jpg?param=130y130'
				},
				{
					name: '最美年纪遇见你',
					artist: '小蓝背心',
					url: 'http://music.163.com/song/media/outer/url?id=1942022689.mp3',
					cover: 'http://p2.music.126.net/DkH_ScmAKfu4R6Yg4zivMw==/109951167346758215.jpg?param=130y130'
				},
				{
					name: '爱的失眠术',
					artist: '王浩伦',
					url: 'http://music.163.com/song/media/outer/url?id=1940383646.mp3',
					cover: 'http://p1.music.126.net/nzQedZSufUn_n5Tu5E7pzQ==/109951167326182985.jpg?param=130y130'
				}
			]
		}],

		// 添加title
		["dynamic-title",
			{
				showIcon: "/favicon.ico",
				showText: "(/≧▽≦/)欢迎回来！",
				hideIcon: "/failure.ico",
				hideText: "(●—●)博客在这！",
				recoverTime: 2000
			}
		],

		// 广告栏
		// ['@vuepress-reco/vuepress-plugin-bulletin-popover', {
		//     title: '公告',
		//     body: [{
		//             type: 'title',
		//             content: '欢迎加我的vx 🎉🎉🎉',
		//             style: 'text-aligin: center;',
		//         },
		//         {
		//             type: 'text',
		//             content: 'VX：jqsdwmlqsjyrs',
		//             style: 'text-align: center;'
		//         },
		//         // {
		//         //     type: 'text',
		//         //     content: '喜欢的主题特效可以去个人信息',
		//         //     style: 'text-align: center;'
		//         // },
		//         // {
		//         //     type: 'text',
		//         //     content: '友链或疑问均可在留言板给我留言',
		//         //     style: 'text-align: center;'
		//         // }
		//     ],
		//     footer: [{
		//         type: 'button',
		//         text: '打赏',
		//         link: '/my-blog/views/About/author.html'
		//     }, ]
		// }],

		// 点击爆炸效果
		[
			"vuepress-plugin-cursor-effects",
			{
				size: 2, // size of the particle, default: 2
				shape: 'circle', // shape of the particle, default: 'star'
				zIndex: 999999999 // z-index property of the canvas, default: 999999999
			}
		],

		// 彩色透明带动画效果
		["ribbon-animation", {
			size: 90, // 默认数据
			opacity: 0.3, //  透明度
			zIndex: -1, //  层级
			opt: {
				// 色带HSL饱和度
				colorSaturation: "80%",
				// 色带HSL亮度量
				colorBrightness: "60%",
				// 带状颜色不透明度
				colorAlpha: 0.65,
				// 在HSL颜色空间中循环显示颜色的速度有多快
				colorCycleSpeed: 6,
				// 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
				verticalPosition: "center",
				// 到达屏幕另一侧的速度有多快
				horizontalSpeed: 200,
				// 在任何给定时间，屏幕上会保留多少条带
				ribbonCount: 2,
				// 添加笔划以及色带填充颜色
				strokeSize: 0,
				// 通过页面滚动上的因子垂直移动色带
				parallaxAmount: -0.5,
				// 随着时间的推移，为每个功能区添加动画效果
				animateSections: true
			},
			ribbonShow: false, //  点击彩带  true显示  false为不显示
			ribbonAnimationShow: true // 滑动彩带
		}]
	]

}
