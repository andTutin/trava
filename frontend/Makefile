build:
	docker build -t frontend-image .
run-dev:
	docker run --rm -itd -p 80:5173 -v "$(PWD)":/frontend --name frontend-container frontend-image
stop:
	docker stop frontend-container