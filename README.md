# Currently in development | Not finished

# Getting Started

## Clone Project

```bash
# Clone project
git clone https://github.com/ED-LetsCode/opentable.git
```

## Install all dependencies

```
npm install
```

## Setup PostgreSQL Database

```bash
# Get Postgres Docker Container
docker pull postgres
# then run
docker run --name opentable -d -p 5432:5432 -e POSTGRES_PASSWORD=opentable postgres
```

DB Login Data:

- Username: postgres
- Password: opentable

## Push Prisma DB Schema

```
npx prisma db push
```

## Start Project

```
npm run dev
```

## Feed database with data

Open: http://localhost:3000/api/seed

## Now you can use the project

Open: http://localhost:3000

#

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

