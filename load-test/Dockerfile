# Use an official k6 runtime as the base image
FROM grafana/k6

WORKDIR /
# Copy the local K6 test script to the container
COPY script.js .
# Define the command to run the K6 test script
CMD ["run", "script.js", "--vus", "10", "--duration", "30s"]