main: pages pages/TypedPhoneGap.min.js pages/TypedPhoneGap.d.ts

pages:
	mkdir pages

pages/TypedPhoneGap.min.js: pages/TypedPhoneGap.js
	node_modules/uglify-js/bin/uglifyjs pages/TypedPhoneGap.js -o pages/TypedPhoneGap.min.js

pages/TypedPhoneGap.js: TypedPhoneGap/TypedPhoneGap.ts
	tsc TypedPhoneGap/TypedPhoneGap.ts --out pages/TypedPhoneGap.js

pages/TypedPhoneGap.d.ts: TypedPhoneGap/TypedPhoneGap.ts
	tsc TypedPhoneGap/TypedPhoneGap.ts --declaration --out pages/TypedPhoneGap.d.ts

.PHONY: main
