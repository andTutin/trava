build:
	docker build -t backend-image .
run:
	docker run -p 3000:3000\
	 -v $(PWD):/backend\
	 --name backend-container\
	 backend-image
stop:
	docker stop backend-container