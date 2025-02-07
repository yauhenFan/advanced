/* eslint-disable camelcase */
import { test, expect } from '@playwright/test';
import { MainPage } from './POM/mainPage';
import { WEB_URL } from '../src/data/url.mjs';
import { DashboardPage } from './POM/dashboardPage.mjs';
import { Invited_User, Invited_Pswd } from '../src/utils/credentials';
import { connectToBrowser } from './utils/setup';
import { capabilities } from './utils/capabilities';

let mainPage;
let dashboardPage;

test('Login', async ({ browserName }) => {
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

	try {
		await expect(mainPage.dashboardSidebarIcon).toBeVisible();
		// Mark the test as completed or failed
		await page.evaluate(
			_ => {},
			`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`
		);
	} catch {
		await page.evaluate(
			_ => {},
			`lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`
		);
	}
});

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
	await mainPage.dashboardSidebarIcon.hover({ timeout: 15000 });
	try {
		await expect(mainPage.dashboardToolTipText).toHaveText('Dashboards');
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

test('DrapAndDrop widget and verify location changed', async ({
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
	let secondWidgetHeader =
		'div.react-grid-layout > div.react-grid-item:nth-child(2) .widgetHeader__info-block--Lp75m';
	let firstWidgetHeader =
		'div.react-grid-layout > div.react-grid-item:nth-child(1) .widgetHeader__info-block--Lp75m';
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
});
