install:
	@echo "Installing Node dependencies"
	@npm install
	@echo "Installing Selenium webdrivers"
	@./node_modules/.bin/webdriver-manager update  --versions.chrome="2.26" --versions.gecko="v0.11.1"

build-dev:
	./node_modules/.bin/babel --watch -d lib/ src/

build:
	./node_modules/.bin/babel -d lib/ src/

test-local:
	./node_modules/.bin/mocha --timeout 30000 --compilers js:babel-register test/local_server/setup.js test/local_server/*_spec.js

test-remote:
	./node_modules/.bin/mocha --timeout 30000 --compilers js:babel-register test/remote_server/setup.js test/remote_server/*_spec.js

test:
	make test-local
	make test-remote
