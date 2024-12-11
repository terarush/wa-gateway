FROM node:16

# Install dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
    libgconf-2-4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxrandr2 \
    libgtk-3-0 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libnspr4 \
    libxss1 \
    libxtst6 \
    fonts-liberation \
    libappindicator3-1 \
    libindicator3-0.4 \
    && rm -rf /var/lib/apt/lists/*

# Install chromium
RUN apt-get update && apt-get install -y chromium

# Install dependencies and your project
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
