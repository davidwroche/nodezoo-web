build :
	mkdir -p app
	git clone https://github.com/rjrodger/seneca-browser
	cp -r ../../web.js ../../node_modules ../../srv ../../www app
	cp -r seneca-browser app/node_modules
	docker build -t nodezoo-web:1 .
	docker build -t nodezoo-web-prod:1 -f Dockerfile-prod .

clean :
	rm *~

.PHONY : build clean
