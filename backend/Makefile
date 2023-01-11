build:
	docker build -t backend-image .
run:
	docker run --rm -p 3000:3000 -v /backend/node_modules -v "$(pwd)":/backend --name backend-container backend-image 
stop:
	docker stop backend-container