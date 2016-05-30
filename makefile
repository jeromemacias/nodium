install:
	@echo "Installing Node dependencies"
	@npm install

build:
	./node_modules/.bin/babel --presets es2015,stage-2 -d lib/ src/
