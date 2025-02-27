import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const PERSONAL_TOKEN = process.env.PERSONAL_TOKEN;

const RPconfig = {
  apiKey: PERSONAL_TOKEN,
  endpoint: 'https://rp.epam.com/api/v1',
  project: 'yauhen_habinet_personal',
  launch: 'Demo Launch',
  description: 'Your launch description',
};

const config: PlaywrightTestConfig = {
    reporter: [['@reportportal/agent-js-playwright', RPconfig]],
    testDir: './playwrightTests',
  };
export default config;