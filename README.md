# Description

This repository contains the implementation of a test automation task.

# Table Of Contents

- [Playwright boilerplate](#playwright-boilerplate)
- [Table Of Contents](#table-of-contents)
- [System Requirements](#system-requirements)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Viewing The Last Test Report](#viewing-the-last-test-report)

# System Requirements

- Node.js 18+
- Operating system:
  - Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
  - macOS 13 Ventura, or macOS 14 Sonoma.
  - Debian 11, Debian 12, Ubuntu 20.04 or Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture.

# Prerequisites

Copy the `.env.example` file, rename it to `.env` and fill in the values. (Terminal command: `cp .env.example .env`)

Example:

```Shell
# .env
BASE_URL=https://www.your-website.eu
CART_API_URL=https://checkout.your-website.eu
USER_EMAIL=myuser@gmail.com
USER_PASSWORD=My@Password24
```

# Setup

```Shell
# Install dependencies.
npm i

# Install Playwright browsers.
npx playwright install

# Install Playwright operating system dependencies.
sudo npx playwright install-deps
```

# Running Tests

```Shell
# Run the end-to-end tests.
npm test

# Start the interactive UI mode.
npm run ui

# Run the tests in debug mode.
npm run debug
```

# Viewing The Last Test Report

```Shell
# To open the most recent HTML report in your default browser.
npm run report
```
