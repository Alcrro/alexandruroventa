FROM node:20-alpine as builder

WORKDIR /nextjsdocker 

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build


FROM node:20-alpine as production
WORKDIR /nextjsdocker 

COPY --from=builder /nextjsdocker/package*.json ./
COPY --from=builder /nextjsdocker/.next ./.next
COPY --from=builder /nextjsdocker/public ./public
COPY --from=builder /nextjsdocker/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm","run", "start"]