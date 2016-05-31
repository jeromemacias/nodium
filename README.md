# Nodium

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
- assert/
    - chai: use expect and should from chai using chai-as-expected

## Todo

- write documentation (by now, you can read the code directly)
- add tests (see https://github.com/jeromemacias/mocha-node-webdriver for usage examples)
- add more hook helpers
