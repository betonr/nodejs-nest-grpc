# gRPC Microservices Example with NestJS

This repository demonstrates a practical implementation of microservices communication using gRPC with NestJS. The project simulates a simple e-commerce system with two separate services:

- **Catalog Service**: REST API that serves product information to clients
- **Inventory Service**: gRPC service that maintains real-time stock information

### gRPC Server (Inventory Service)

The Inventory Service implements the gRPC server using NestJS microservices:

```typescript
@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @GrpcMethod("InventoryService", "CheckStock")
  checkStock(data: CheckStockRequest): StockResponse {
    return this.inventoryService.checkStock(data.productId);
  }
}
```

### gRPC Client (Catalog Service)

The Catalog Service connects to the gRPC server:

```typescript
@Module({
  imports: [
    ClientsModule.register([
      {
        name: "INVENTORY_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "inventory",
          protoPath: join(__dirname, "../proto/inventory.proto"),
          url: "localhost:50051",
        },
      },
    ]),
  ],
  // ...
})
```

## Setup and Installation

### Prerequisites

- Node.js >= 18
- npm or yarn


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/betonr/nodejs-nest-grpc.git
cd nodejs-nest-grpc
```


2. Install dependencies for both services:

```shellscript
# Install Inventory Service dependencies
cd inventory-service
npm install

# Install Catalog Service dependencies
cd ../catalog-service
npm install
```


### Running the Services

1. Start the Inventory Service (gRPC server):

```shellscript
cd inventory-service
npm run build
npm run start
```


2. In a separate terminal, start the Catalog Service (REST API):

```shellscript
cd catalog-service
npm run build
npm run start
```


## Usage Examples

### Get All Products

```shellscript
curl http://localhost:3000/products
```

Example response:

```json
[
  {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "inStock": true,
    "quantity": 10
  },
  {
    "id": "2",
    "name": "Smartphone",
    "description": "Latest model smartphone",
    "price": 899.99,
    "inStock": true,
    "quantity": 5
  },
  {
    "id": "3",
    "name": "Headphones",
    "description": "Noise-cancelling headphones",
    "price": 249.99,
    "inStock": false,
    "quantity": 0
  }
]
```

### Get a Specific Product

```shellscript
curl http://localhost:3000/products/1
```

Example response:

```json
{
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1299.99,
    "inStock": true,
    "quantity": 10
}
```

## Project Structure

```plaintext
nodejs-nest-grpc/
├── inventory-service/           # gRPC server
│   ├── src/
│   │   ├── inventory/           # Inventory module
│   │   │   ├── interfaces/      # TypeScript interfaces
│   │   │   ├── inventory.controller.ts
│   │   │   ├── inventory.module.ts
│   │   │   └── inventory.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── proto/                   # Protocol Buffer definitions
│       └── inventory.proto
│
└── catalog-service/             # REST API
    ├── src/
    │   ├── products/            # Products module
    │   │   ├── interfaces/      # TypeScript interfaces
    │   │   ├── products.controller.ts
    │   │   ├── products.module.ts
    │   │   └── products.service.ts
    │   ├── app.module.ts
    │   └── main.ts
    └── proto/                   # Protocol Buffer definitions (copy)
        └── inventory.proto
```

## Key Concepts Demonstrated

1. **gRPC Service Definition**: Using Protocol Buffers to define the service contract
2. **NestJS gRPC Integration**: Setting up a gRPC microservice in NestJS
3. **gRPC Client**: Connecting to a gRPC service from another NestJS application
4. **Error Handling**: Gracefully handling communication errors between services
5. **Microservice Architecture**: Demonstrating the separation of concerns between services


## Benefits of This Approach

- **Performance**: gRPC is more efficient than REST for internal service communication
- **Type Safety**: Protocol Buffers provide strong typing for the API contract
- **Modularity**: Services can be developed, deployed, and scaled independently
- **Encapsulation**: Internal service details are hidden from external clients
- **Real-time Data**: Stock information is always up-to-date without caching issues

