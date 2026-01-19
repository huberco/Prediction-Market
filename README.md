# Prediction Market Protocol

[![License](https://img.shields.io/badge/License-MIT--Commons-blue.svg)](./LICENSE)
[![CI](https://github.com/kuestcom/prediction-market/actions/workflows/ci.yml/badge.svg)](https://github.com/kuestcom/prediction-market/actions/workflows/ci.yml)

> **Enterprise-grade infrastructure for decentralized prediction markets. Deploy your own fully-featured trading platform in minutes.**

---

## Overview

This is a production-ready, open-source prediction market platform that combines the best of Web3 and traditional finance. Built for scalability, security, and user experience, it provides everything needed to launch and operate a professional prediction market.

### What Makes This Different

- **Zero-Custody Architecture**: Users maintain full control of their assets through proxy wallet technology
- **Institutional-Grade Security**: Multi-signature wallets, 2FA, and audited smart contracts
- **Real-Time Order Matching**: Central Limit Order Book (CLOB) with sub-second execution
- **Cross-Chain Ready**: Built on Polygon with architecture ready for multi-chain expansion
- **Self-Hosted & Customizable**: Full source code access with no vendor lock-in

---

## Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Application] --> B[Wallet Integration]
        B --> C[SIWE Authentication]
    end
    
    subgraph "Application Layer"
        C --> D[Next.js API Routes]
        D --> E[Better Auth Session]
        E --> F[Proxy Wallet Manager]
    end
    
    subgraph "Trading Engine"
        F --> G[Order Builder]
        G --> H[Signature Validator]
        H --> I[CLOB API Client]
        I --> J[Order Matching Engine]
    end
    
    subgraph "Data Layer"
        J --> K[Supabase PostgreSQL]
        K --> L[Real-time Subscriptions]
        L --> A
    end
    
    subgraph "Blockchain Layer"
        J --> M[Polygon Network]
        M --> N[Conditional Tokens]
        N --> O[Exchange Contracts]
    end
    
    subgraph "External Services"
        P[Cron Scheduler] --> Q[Goldsky Subgraph]
        Q --> R[Arweave Metadata]
        R --> K
    end
    
    style A fill:#4fc3f7
    style J fill:#66bb6a
    style K fill:#ffa726
    style M fill:#ab47bc
```

### Core Systems

| System | Technology | Purpose |
|--------|-----------|---------|
| **Authentication** | Better Auth + SIWE | Wallet-based identity without passwords |
| **Order Execution** | CLOB Protocol | High-performance order matching |
| **Asset Management** | Safe Proxy Wallets | Non-custodial user funds |
| **Data Indexing** | Goldsky Subgraph | Real-time blockchain event tracking |
| **Storage** | Supabase + Arweave | Reliable metadata and asset storage |

---

## Quick Start

### Prerequisites

- Node.js 24.x
- PostgreSQL database (Supabase recommended)
- Wallet with testnet funds (for development)

### Installation

```bash
# Clone the repository
git clone https://github.com/kuestcom/prediction-market.git
cd prediction-market

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Environment Configuration

Required environment variables:

```env
# Database
POSTGRES_URL=postgresql://user:pass@host:5432/db

# Authentication
BETTER_AUTH_SECRET=your-32-char-secret
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Blockchain
NEXT_PUBLIC_REOWN_APPKIT_PROJECT_ID=your-project-id

# Trading APIs
CLOB_URL=https://clob.kuest.com
RELAYER_URL=https://relayer.kuest.com

# Optional
CRON_SECRET=your-cron-secret
VERCEL_PROJECT_PRODUCTION_URL=your-domain.com
```

---

## Features

### Trading

- **Market & Limit Orders**: Full order type support with GTC, GTD, FAK, and IOC
- **Real-Time Orderbook**: Live bid/ask updates via WebSocket
- **Portfolio Management**: Track positions, P&L, and trading history
- **Advanced Charts**: Interactive price charts with technical indicators

### Security

- **Proxy Wallet System**: Safe (Gnosis Safe) integration for secure asset management
- **Two-Factor Authentication**: Optional TOTP-based 2FA
- **Session Management**: Secure cookie-based sessions with automatic expiration
- **Smart Contract Audits**: All contracts undergo security reviews

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Mode**: System-aware theme switching
- **Accessibility**: WCAG 2.1 AA compliant components
- **Performance**: Sub-100ms API responses, optimized bundle sizes

### Administration

- **Market Creation**: Admin interface for creating and managing markets
- **Event Management**: Full CRUD operations for events and outcomes
- **User Management**: Admin dashboard with user analytics
- **Settings Configuration**: Platform-wide settings management

---

## Technology Stack

### Frontend

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **State**: Zustand 5.0
- **Charts**: @visx (D3.js wrapper)
- **UI Components**: Radix UI primitives

### Backend

- **Runtime**: Node.js 24.x
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM 0.45
- **Authentication**: Better Auth 1.4
- **API**: Next.js API Routes

### Blockchain

- **Network**: Polygon (Amoy testnet / Mainnet)
- **Ethereum Client**: viem 2.44
- **React Hooks**: wagmi 2.19
- **Wallet SDK**: Reown AppKit 1.8

### Infrastructure

- **Hosting**: Vercel (serverless functions)
- **Database**: Supabase (managed PostgreSQL)
- **CDN**: Vercel Edge Network
- **Monitoring**: Built-in error tracking

---

## Development

### Project Structure

```
prediction-market/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and business logic
│   ├── hooks/            # Custom React hooks
│   ├── stores/           # Zustand state management
│   └── types/            # TypeScript type definitions
├── supabase/
│   └── migrate.js        # Database migration runner
├── tests/                # Test suites
└── docs/                 # Documentation
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run db:push      # Run database migrations
```

### Code Quality

- **Linting**: ESLint with strict TypeScript rules
- **Formatting**: Automatic code formatting on commit
- **Type Safety**: Strict TypeScript configuration
- **Testing**: Vitest for unit tests, Playwright for E2E

---

## API Documentation

The platform exposes RESTful APIs for programmatic access:

- **Trading API**: Place orders, check balances, view positions
- **Market API**: Fetch markets, events, and orderbook data
- **User API**: Profile management and settings
- **Admin API**: Market creation and management (admin only)

Full API documentation is available in the `/docs` directory.

---

## Security Considerations

### Smart Contracts

- All contracts are audited before deployment
- Proxy wallet pattern for enhanced security
- Multi-signature support for high-value operations

### Application Security

- Input validation on all user inputs
- SQL injection prevention via parameterized queries
- XSS protection through React's built-in escaping
- CSRF protection via SameSite cookies
- Rate limiting on API endpoints

### Best Practices

- Never commit secrets to version control
- Use environment variables for all sensitive data
- Regularly update dependencies
- Monitor for security advisories
- Conduct regular security audits

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

---

## License

This project is licensed under the Modified MIT License with Commons Clause. See [LICENSE](./LICENSE) for details.

**Important**: Review the license terms before deploying to production. Certain commercial uses may require additional permissions.

---

## Support

- **Documentation**: See `/docs` directory for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join GitHub Discussions for questions

---

<div align="center">

**Built with modern Web3 technologies for the decentralized future.**

[Documentation](./docs) • [API Reference](./docs/developers) • [Contributing](./CONTRIBUTING.md)

</div>
