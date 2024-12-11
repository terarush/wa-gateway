.PHONY: build up down restart logs install clean

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

restart:
	docker-compose down && docker-compose up -d

logs:
	docker-compose logs -f

install:
	npm install

clean:
	docker-compose down --volumes --remove-orphans

