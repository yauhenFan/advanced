/* eslint-disable camelcase */
import { test, expect } from '@playwright/test';
import { MainPage } from './POM/mainPage';
import { WEB_URL } from '../src/data/url.mjs';
import { DashboardPage } from './POM/dashboardPage.mjs';
import { Invited_User, Invited_Pswd } from '../src/utils/credentials';
import { connectToBrowser } from './utils/setup';
import { capabilities } from './utils/capabilities';

test.describe('UI testing for Dashboard application using PLaywright', async () => {
	let mainPage;
	let dashboardPage;
	test('I hover over Dashboard icon i verify test in tooltip', async ({
		browserName,
	}) => {
		const capability = capabilities.find(
			cap => cap.browserName === browserName
		);
		if (!capability) {
			throw new Error('No Browser Found this with Capability');
		}

		const browser = await connectToBrowser(capability);
		const page = await browser.newPage();
		mainPage = new MainPage(page);
		dashboardPage = new DashboardPage(page);
		await mainPage.openApp(WEB_URL);
		await mainPage.enterLoginData(Invited_User, Invited_Pswd);
		await mainPage.dashboardSidebarIcon.hover({ timeout: 5000 });
		try {
			expect(mainPage.dashboardToolTipText).toHaveText('Dashboards', {
				timeout: 5000,
			});
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`
			);
		} catch {
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`
			);
		}

		await mainPage.dashboardSidebarIcon.click();
		let secondWidgetHeader =
			'div.widgets-grid div.react-grid-item:nth-child(9) div.widget__widget-header--YaPlQ';
		let firstWidgetHeader =
			'div.widgets-grid div.react-grid-item:nth-child(10) div.widget__widget-header--YaPlQ';
		try {
			await dashboardPage.verifyDragAndDropForWidget(
				secondWidgetHeader,
				firstWidgetHeader
			);
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`
			);
		} catch {
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`
			);
		}
		await dashboardPage.restoreDemoData();

		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.addNewDashboardButton.isVisible();
		await dashboardPage.addNewDashboardButton.click();
		try {
			await dashboardPage.verifyElementResized(
				dashboardPage.addNewDashboardWindow,
				1000
			);
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`
			);
		} catch {
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`
			);
		}
		await mainPage.addDashboardCancelBtn.isVisible();
		await mainPage.addDashboardCancelBtn.click();

		await dashboardPage.widgetPageFooter.scrollIntoViewIfNeeded();
		try {
			await expect(dashboardPage.widgetPageFooter).toBeVisible();
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`
			);
		} catch {
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`
			);
		}

		await mainPage.dashboardSidebarIcon.click();
		await dashboardPage.settingsIcon.click();
		await mainPage.dashboardSidebarIcon.click();
		if (dashboardPage.widgetPageFooter.isHidden()) {
			await dashboardPage.widgetPageFooter.scrollIntoViewIfNeeded();
		}
		try {
			await expect(dashboardPage.widgetPageFooter).toBeVisible();
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Test Passed' } })}`
			);
		} catch {
			await page.evaluate(
				_ => {},
				`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Test Failed' } })}`
			);
		}
	});
});
