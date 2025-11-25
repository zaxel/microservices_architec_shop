# Microservices Architecture Examples (Simplified)

This is a simulation of an e-commerce checkout process demonstrating different microservices architecture patterns and their communication methods.

## Architecture Implementations

This project includes **4 different implementations**:

### 1. **Monolithic Architecture** (Sequential)
Traditional synchronous request-response pattern where services are called sequentially:
- Payment → Analytics → Order → Email
- All operations happen in order, blocking until each completes
- Demonstrates tight coupling and synchronous communication

### 2. **Event-Driven with Kafka** (Single-Node)
Asynchronous event-driven pattern using Kafka:
- Single cluster, single broker setup
- Payment publishes event → Multiple services consume independently
- Non-blocking, parallel processing
- Runs locally with Docker

### 3. **Event-Driven with Kafka** (Multi-Cluster)
Advanced Kafka setup with fault tolerance:
- Multi-cluster, multi-broker configuration
- Fault-tolerant and stress-resistant
- Demonstrates production-grade distributed systems
- High availability and scalability

### 4. **Event-Driven with Redis** (Cloud-Ready)
Lightweight async pattern using Redis pub/sub:
- Uses Upstash (free Redis cloud provider)
- Simulates Kafka-like message passing
- Deployed online (Vercel + Render + Upstash)
- Demonstrates cloud-native microservices

## Tech Stack

**Frontend:**
- React (functional components)
- Next.js 15 (App Router, SSR, image optimization)
- TailwindCSS 4
- React Query (data fetching)
- Axios (HTTP client)

**Backend:**
- Node.js + Express.js
- Kafka (message broker - implementations 2 & 3)
- Redis pub/sub (message broker - implementation 4)
- SSE (Server-Sent Events) for real-time analytics

**Infrastructure:**
- Docker (local Kafka & Redis)
- Upstash (cloud Redis for production)
- Vercel (frontend deployment)
- Render (backend deployment)

## Live Demo

👉 [**View Demo**](https://microservices-architec-shop-z.vercel.app/)

⚠️ **Note:** Initial requests may take 1-2 minutes as free-tier servers wake up from sleep.

## Architecture Comparison

| Feature         | Monolithic  | Kafka Single-Node | Kafka Multi-Cluster | Redis Cloud  |
|-----------------|-------------|-------------------|---------------------|--------------|
| Communication   | Synchronous | Asynchronous      | Asynchronous        | Asynchronous |
| Coupling        | Tight       | Loose             | Loose               | Loose        |
| Scalability     | Limited     | High              | Very High           | High         |
| Fault Tolerance | Low         | Medium            | High                | Medium       |
| Complexity      | Low         | Medium            | High                | Low-Medium   |
| Deployment      | Simple      | Local Docker      | Complex             | Cloud-Ready  |

## Project Structure
```
microservices-architec-shop/
├── frontend/                    # Next.js app
├── backend/
│   ├── monolith_services/      # Implementation #1
│   ├── kafka_single_node/      # Implementation #2 (Kafka)
│   ├── kafka_multi_cluster/    # Implementation #3 (Kafka)
│   └── distributed_services/   # Implementation #4 (Redis)
└── README.md
```

