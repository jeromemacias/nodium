install:
	@echo "Installing Node dependencies"
	@npm install

build-dev:
	./node_modules/.bin/babel --watch -d lib/ src/

build:
	./node_modules/.bin/babel -d lib/ src/
