#!/bin/bash

# Function to cleanup on exit
cleanup() {
  echo "Shutting down..."
  kill $(jobs -p) 2>/dev/null
  exit
}

trap cleanup SIGINT SIGTERM

# Start backend server
echo "Starting backend server on port 3000..."
node server.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is still running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
  echo "Backend server failed to start. Check MongoDB connection."
  exit 1
fi

# Start Vite frontend
echo "Starting frontend server on port 5000..."
npm run dev

# Cleanup when frontend exits
cleanup
