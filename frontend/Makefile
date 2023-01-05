build:
	docker build -t frontend-image .
run:
	docker run -p 80:5173\
	 -v $(PWD):/frontend\
	 frontend-image
stop:
	docker stop frontend-container