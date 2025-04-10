/**
 * 	config 全局配置文件
 *
 * ------------------------------------------------------------
 *
 * 	Copyright © 2024 湖南大沥网络科技有限公司.
 *
 * 	  author:	木炭(WOODCOAL)
 * 	   email:	i@woodcoal.cn
 * 	homepage:	http://www.hunandali.com/
 *
 * ------------------------------------------------------------
 */

import { cleanDuplicate, isObject, type Dict } from '@da.li/core-libs';
import type { IMessage } from './types';

/** 配置属性 */
export interface ConfigOptions extends Dict {
	/** 应用名称 */
	name?: string;

	/** 应用版本 */
	version?: string;

	/** 应用描述 */
	description?: string;

	/** 企业 */
	company?: string;

	/** 应用网址 */
	url?: string;

	/** 应用关键词 */
	keywords?: string;
}

/** 全局事件名称前缀 */
export const EVENT_PREFIX = 'dali:event:';

/** 全局事件名称生成器 */
const event = (name: string) => `${EVENT_PREFIX}${name}`;

/** 全局应用信息 */
export const APP = {
	/** 应用名称 */
	NAME: '大沥网络组件库',

	/** 应用版本 */
	VERSION: '49.10.1',

	/** 应用描述 */
	DESCRIPTION: '一个基于 Tabler 样式的 Astro 组件库',

	/** 企业 */
	COMPANY: '湖南大沥网络科技有限公司',

	/** 应用网址 */
	URL: 'https://www.hunandali.com',

	/** 应用关键词 */
	KEYWORDS: '大沥网络,组件库,astro,tabler'
};

/** 全局事件变量 */
export const EVENTS = {
	COUNTUP: {
		START: event('countup-start'),
		COMPLETE: event('countup-complete')
	}
};

/** 全局错误状态码 */
export const ERROR_CODES: Record<string, string | IMessage> = {
	// 404: {
	// 	icon: 'address-disabled',
	// 	title: '页面不存在',
	// 	message: '访问的页面不存在',
	// 	theme: 'warning'
	// },
	// 500: {
	// 	icon: 'fail',
	// 	title: '服务异常',
	// 	message: '系统服务发生异常，麻烦联系系统服务人员处理',
	// 	theme: 'danger'
	// },
	// params: {
	// 	icon: 'i-icon-tip',
	// 	title: '参数异常',
	// 	message: '无效参数或者参数不匹配',
	// 	theme: 'warning'
	// },
	client: {
		icon: 'display-disabled',
		title: '客户端无效',
		message: '当前客户端参数错误或者已经被禁止使用',
		theme: 'danger'
	},
	// sign: {
	// 	icon: 'signet-disabled',
	// 	title: '数据异常',
	// 	message: '与服务器通讯时检测到数据签名错误。',
	// 	theme: 'danger'
	// },
	// network: {
	// 	icon: 'parameter-disabled',
	// 	title: '网络异常',
	// 	message: '无法与服务器建立连接，请检查网络连接是否正常',
	// 	theme: 'danger'
	// },
	// news: '无新闻列表',
	// favor: '暂无收藏',
	// order: '订单为空',
	// request: '无效请求', // gameover
	// address: '没有收货地址',
	// shopping: '购物车为空', // shopping-cart
	// permission: '无此操作权限',
	// page: '页面不存在',
	// result: '没有搜索结果', // list-search
	// comment: '暂无评论',
	// message: '消息列表为空',
	// coupon: '没有优惠券',
	datas: '暂无更多数据',
	// history: '无历史记录',
	load: '数据加载中'
};

/** 初始化常量 */
export const init = (options: ConfigOptions) => {
	!isObject(options) && (options = {});

	APP.NAME = options.name || import.meta.env.PUBLIC_APP_NAME;
	APP.VERSION = options.version || import.meta.env.PUBLIC_APP_VERSION;
	APP.DESCRIPTION = options.description || import.meta.env.PUBLIC_APP_DESCRIPTION;
	APP.COMPANY = options.company || import.meta.env.PUBLIC_APP_COMPANY;
	APP.URL = options.url || import.meta.env.PUBLIC_APP_URL;

	// 关键词
	const keywords = options.keywords || import.meta.env.PUBLIC_APP_KEYWORDS;
	APP.KEYWORDS = keywords ? cleanDuplicate(keywords.split(',')).join(',') : '';
};
