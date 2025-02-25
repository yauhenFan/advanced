/* eslint-disable camelcase */
import { test, expect } from '@playwright/test';
import { MainPage } from './POM/mainPage';
import { WEB_URL, DEMO_DASHBOARD_URL } from '../src/data/url.mjs';
import { DashboardPage } from './POM/dashboardPage.mjs';
import { Invited_User, Invited_Pswd } from '../src/utils/credentials';
import { sendSlackRequest } from './utils/helpers/slack.helper.mjs';

test.describe('UI testing for Dashboard application using PLaywright', async () => {
	test.beforeAll('Slack start message', async () => {
		await sendSlackRequest('post', 'Starting tests....');
	});

	test.afterAll('Slack end message', async () => {
		await sendSlackRequest('post', 'Finishing tests....');
	});

	let mainPage;
	let dashboardPage;
	test.beforeEach('Login Step', async ({ page }) => {
		mainPage = new MainPage(page);
		dashboardPage = new DashboardPage(page);
		await mainPage.openApp(WEB_URL);
		await mainPage.enterLoginData(Invited_User, Invited_Pswd);
	});

	test('I hover over Dashboard icon i verify test in tooltip', async ({
		page,
	}) => {
		await mainPage.dashboardSidebarIcon.hover({ timeout: 15000 });
		await expect(mainPage.dashboardToolTipText).toHaveText('Dashboards');
	});

	test('DrapAndDrop widget and verify location changed', async ({ page }) => {
		let secondWidgetHeader =
			'div.widgets-grid div.react-grid-item:nth-child(9) div.widget__widget-header--YaPlQ';
		let firstWidgetHeader =
			'div.widgets-grid div.react-grid-item:nth-child(10) div.widget__widget-header--YaPlQ';
		await dashboardPage.verifyDragAndDropForWidget(
			secondWidgetHeader,
			firstWidgetHeader
		);
		await dashboardPage.restoreDemoData();
	});

	test('Resize the Add New DashBoard  modal window', async ({ page }) => {
		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.addNewDashboardButton.isVisible();
		await dashboardPage.addNewDashboardButton.click();
		await dashboardPage.verifyElementResized(
			dashboardPage.addNewDashboardWindow,
			1000
		);
	});

	test('Scroll to element', async ({ page }) => {
		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.demoDashboardTitle.click();
		dashboardPage.widgetPageFooter.scrollIntoViewIfNeeded();
		await expect(dashboardPage.widgetPageFooter).toBeVisible();
	});

	test('Verify if element is visible and if not, scrool to element', async ({
		page,
	}) => {
		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.demoDashboardTitle.click();
		if (dashboardPage.widgetPageFooter.isHidden()) {
			await dashboardPage.widgetPageFooter.scrollIntoViewIfNeeded();
		}
		await expect(dashboardPage.widgetPageFooter).toBeVisible();
	});

	test('Intercaption of browser request on click', async ({ page }) => {
		await page.route(DEMO_DASHBOARD_URL, async route => {
			await route.continue();
			const response = await route.request().response();
			expect(response.status()).toBe(200);
		});
		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.demoDashboardTitle.click();
	});
});
