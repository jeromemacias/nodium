# Nodium
[![NPM Version](https://badge.fury.io/js/nodium.svg?style=flat)](https://npmjs.org/package/nodium)
[![Build Status](https://travis-ci.org/jeromemacias/nodium.svg?branch=master)](https://travis-ci.org/jeromemacias/nodium) [![Circle CI](https://circleci.com/gh/jeromemacias/nodium/tree/master.svg?style=shield)](https://circleci.com/gh/jeromemacias/nodium/tree/master) [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=bGI4TkpBS2JVbG50Qk15S3YvTGpWcFMvaVpNTmZadEg3YlR3THpqQWdvWT0tLUsvZGdVc0xpZHRNcTIwMVozY0syclE9PQ==--53c9b90dcfac6daa368fd33e5e18363ca2e057d7%)](https://www.browserstack.com/automate/public-build/bGI4TkpBS2JVbG50Qk15S3YvTGpWcFMvaVpNTmZadEg3YlR3THpqQWdvWT0tLUsvZGdVc0xpZHRNcTIwMVozY0syclE9PQ==--53c9b90dcfac6daa368fd33e5e18363ca2e057d7%)
 [![Sauce Test Status](https://saucelabs.com/buildstatus/jeromemacias-nodium)](https://saucelabs.com/u/jeromemacias-nodium)

Nodium is a collection of useful and pure functions around Selenium Webdriver.
Functions can be imported as ES5 or ES6 (stage2) from package.
You are free to use the test runner of your choice.

## Motivation

There is a lot of frameworks on top of Selenium Webdriver.

I wanted to provide a simple wrapper around webdriver to avoid:
- custom and/or complex configuration file
- force usage and/or configuration of a test runner
- writing long documentation to be able to use a tool which is already documented
- global variables and / or context

So we will now be able to:
- use Selenium Webdriver quickly, with your own tools and habits (ES6, BDD, ...)
- choose the way you configure browsers and options used by your testsuite (env var, function parameters, code...)

Hope you will enjoy this toolbox!

## Installation

`npm i nodium`

## Usage

Available helpers:

- driver/
    - index: load the corresponding webdriver depends on defined environment variables (local firefox by default)
    - utils: helpers to play with your loaded pages dom
    - local: load the corresponding local webdriver depends on your owner parameters
    - browserstack: load a configured BrowserStack webdriver depends on your owner parameters
    - saucelabs: load a configured SauceLabs webdriver depends on your owner parameters
- hook/
    - browserstack: update BrowserStack status at the end of your test suite
    - saucelabs: update SaucLabs status at the end of your test suite
    - jsonServer: start jsonServer before running your test
    - pm2: start and stop pm2 processes

## Todo

- write documentation (by now, you can read the code directly)
- add more hook helpers
