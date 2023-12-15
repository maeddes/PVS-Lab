# PVS-Lab

Introduction
This document provides an overview of the project, detailing its architecture, components, and deployment process. The project consists of a web application for creating daily and weekly tasks, supported by four Docker containers: PostgreSQL for the database, Jaeger for OpenTelemetry tracing, Nginx for serving the frontend, and a custom Spring application.

System Architecture
The system follows a microservices architecture with the following components:

PostgreSQL Database (postgres): A relational database for storing task-related data.
Jaeger Tracing (jaeger): An all-in-one tracing solution for monitoring and debugging.
Nginx Web Server (nginx): A web server serving the frontend application.
Custom Spring Application (spring): A backend service responsible for managing tasks.

# Docker Containers
PostgreSQL (postgres)
Default postgres image from docker.
Port 5432

Jaeger (jaeger)
Default jaeger all in one image from docker.
16686:16686 (Web UI)
14250:14250 (OpenTelemetry gRPC)

Nginx (nginx)
Default nginx image from docker. Static html files mounted. Config file mounted.
Runs on port 6969

Custom Spring Application/Backend (spring)
Image created from custom docker file, opentelemetry and jaeger included in the dockerfile.
Runs on port 8080


# Build and Deployment
The build and deployment process involves using Docker Compose. Execute the following command to build and run the containers:
docker-compose up

# Monitoring and Tracing
Jaeger Tracing: Access the Jaeger UI at http://localhost:16686 to monitor traces via "spring" service.
Nginx Web Server(frontend): The Nginx server is available at http://localhost:6969.
