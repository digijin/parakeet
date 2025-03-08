#!/bin/sh

# Start PocketBase in the background
./pocketbase serve --http 0.0.0.0:8090 --dir /app/pb_data &

# Start Next.js
exec node server.js 