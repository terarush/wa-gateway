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

chromium:
	sudo apt-get update
	sudo apt-get install -y \
  libatk1.0-0 \
  libcups2 \
  libx11-xcb1 \
  libxcomposite1 \
  libxrandr2 \
  libgbm1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libnspr4 \
  libnss3 \
  libxss1 \
  libxtst6 \
  fonts-liberation \
  libappindicator3-1 \
  libgdk-pixbuf2.0-0 \
  libnspr4-dev \
  libx11-dev

