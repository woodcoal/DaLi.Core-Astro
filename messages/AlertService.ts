/**
 * AlertService 全局警告信息服务
 *
 * ------------------------------------------------------------
 *
 * 	Copyright © 2025 湖南大沥网络科技有限公司.
 *
 * 	  author:	木炭(WOODCOAL)
 * 	   email:	i@woodcoal.cn
 * 	homepage:	https://www.hunandali.com/
 *
 * ------------------------------------------------------------
 */

import { ThemeIcon } from '../libs';
import { getIcon, getLogo } from '../icons';
import { htmlSafe } from '@da.li/core-libs';
import type { AlertOptions } from '../types';

class AlertService {
	/** 位置 */
	Position: 'top' | 'bottom' | 'center' = 'top';

	/** 容器 */
	private container: HTMLDivElement | null = null;

	/** 创建容器，存在则使用原来容器 */
	private createContainer() {
		if (!this.container) {
			// 全局搜索
			this.container = document.querySelector('.alert-container');
			if (this.container) return this.container;

			// 创建新的容器
			this.container = document.createElement('div');
			this.container.classList.add('alert-container', 'p-2', 'position-absolute');
			document.body.appendChild(this.container);
		}

		// 位置设置
		if (this.container.getAttribute('data-bs-position') === this.Position)
			return this.container;

		this.container.setAttribute('data-bs-position', this.Position);
		this.container.classList.remove(
			'top-0',
			'bottom-0',
			'top-50',
			'start-50',
			'translate-middle-x',
			'translate-middle'
		);

		switch (this.Position) {
			case 'top':
				this.container?.classList.add('top-0', 'start-50', 'translate-middle-x');
				break;
			case 'center':
				this.container?.classList.add('top-50', 'start-50', 'translate-middle');
				break;
			case 'bottom':
				this.container?.classList.add('bottom-0', 'start-50', 'translate-middle-x');
				break;
		}

		return this.container;
	}

	/** 创建消息项目 */
	private createAlertElement(options: AlertOptions): HTMLDivElement {
		let { title, message } = options;
		const { icon: iconName, theme: themeName, important, closeable = true } = options;

		const icon = ThemeIcon(themeName);
		const theme = icon.theme;
		icon.icon = iconName ?? icon.icon;
		icon.icon = icon.logo ? getLogo(icon.icon) : getIcon(icon.icon);

		// 如果没有标题，则消息直接作为标题
		if (!title && message) {
			title = message;
			message = '';
		}

		// 创建 Alert 元素
		const alert = document.createElement('div');
		alert.className = 'alert alert-dismissible';
		important && alert.classList.add('alert-important');
		theme && alert.classList.add(`bg-${icon.theme}-lt`);

		alert.setAttribute('role', 'alert');

		let content = '';

		// 标题
		if (theme === 'primary') {
			content = `<div class="dl-icon user-select-none text-primary text-6 fw-bold"><i class="${icon.icon}"></i><span class="text ms-1 text-4">${title}</span></div>`;
		} else {
			content = `<div class="dl-icon user-select-none text-${icon.theme} text-5 fw-bold"><i class="${icon.icon}"></i><span class="text ms-1 text-4">${title}</span></div>`;
		}

		// 消息内容
		const ms = theme === 'secondary' ? '' : ' ps-5';
		message && (content += `<div class="mt-1${ms} text-secondary">${message}</div>`);

		// 区域
		content = htmlSafe(`<div class="d-block">${content}</div>`);

		// 关闭按钮
		closeable &&
			(content = `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>${content}`);

		alert.innerHTML = content;
		return alert;
	}

	show(options: AlertOptions) {
		const container = this.createContainer();
		const el = this.createAlertElement(options);
		container.appendChild(el);
	}

	// 公共 API
	success(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'success', message, title, ...options });
	}

	warning(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'warning', message, title, ...options });
	}

	danger(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'danger', message, title, ...options });
	}

	info(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'info', message, title, ...options });
	}

	primary(message: string, title?: string, options: Partial<AlertOptions> = {}) {
		this.show({ theme: 'primary', message, title, ...options });
	}
}

export default AlertService;
