/* eslint-disable no-undef */
import { defineConfig } from '@playwright/test';
import { capabilities } from './playwrightTests/utils/capabilities';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
	// Look for test files in the "tests" directory, relative to this configuration file.
	testDir: './playwrightTests',
	// Run all tests in parallel.
	fullyParallel: false,

	// Fail the build on CI if you accidentally left test.only in the source code.
	forbidOnly: !!process.env.CI,

	// Retry on CI only.
	retries: process.env.CI ? 2 : 0,

	// Opt out of parallel tests on CI.
	workers: 1,

	// Reporter to use
	reporter: 'html',

	use: {
		// Base URL to use in actions like `await page.goto('/')`.
		baseURL: 'http://localhost:8080',

		// Collect trace when retrying the failed test.
		trace: 'on-first-retry',
		headless: false,
		screenshot: 'only-on-failure',
	},
	// Configure projects for major browsers.
	projects: capabilities.map(capability => ({
		name: capability['LT:Options'].name,
		use: {
			browserName: capability.browserName,
			...capability['LT:Options'],
		},
	})),
});
