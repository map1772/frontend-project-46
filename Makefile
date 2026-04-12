install:
	npm ci

test:
	npx jest

test-coverage:
	npx jest --coverage

lint:
	npx eslint .

publish:
	npm publish --dry-run
