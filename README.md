# WebAuthn Polished

A comprehensive WebAuthn (Passkey) authentication implementation featuring a web application, mobile app, and backend server. This project demonstrates secure passwordless authentication using the WebAuthn standard across multiple platforms.

![CleanShot 2025-04-12 at 10 29 12@2x](https://github.com/user-attachments/assets/5a39d409-fe74-4ef9-b9e6-628fc89b88ab)


## Project Structure

The project consists of three main components:

- `web/` - A React-based web application using Vite and Chakra UI
- `mobile/` - A React Native mobile application using Expo
- `server/` - An Express.js backend server with TypeScript and Prisma

## Features

- 🔐 WebAuthn/Passkey Authentication
- 🌐 Cross-platform support (Web + Mobile)
- 🎨 Modern UI with Chakra UI (Web) and React Native components (Mobile)
- 🔄 Consistent authentication experience across platforms
- 📱 Native biometric authentication support on mobile
- 🛡️ Secure backend implementation with TypeScript

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or higher)
- Yarn package manager
- Expo CLI (for mobile development)
- iOS Simulator or Android Emulator (for mobile testing)

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/webauthn_polished.git
cd webauthn_polished
\`\`\`

2. Install dependencies for all projects:
\`\`\`bash
yarn install
\`\`\`

## Running the Projects

You can run all projects simultaneously using:

\`\`\`bash
yarn start
\`\`\`

This will start:
- Web frontend at http://localhost:3000
- Backend server at http://localhost:3333
- Mobile app (Expo) at http://localhost:8081

### Running Projects Individually

#### Web Application
\`\`\`bash
cd web
yarn dev
\`\`\`

#### Backend Server
\`\`\`bash
cd server
yarn dev
\`\`\`

#### Mobile Application
\`\`\`bash
cd mobile
yarn start
\`\`\`

## Project Details

### Web Application (web/)
- Built with React + Vite
- Uses Chakra UI for modern, accessible components
- Features:
  - User registration with WebAuthn
  - Login with WebAuthn
  - Protected home page
  - Responsive design

### Mobile Application (mobile/)
- Built with React Native + Expo
- Uses react-native-passkey for WebAuthn support
- Features:
  - Native biometric authentication
  - User registration
  - Secure authentication flow
  - Platform-specific optimizations

### Backend Server (server/)
- Built with Express.js + TypeScript
- Uses Prisma for database management
- Features:
  - WebAuthn registration endpoints
  - Authentication verification
  - Secure session management
  - Type-safe API implementation

## API Endpoints

The backend server exposes the following endpoints:

- `POST /auth/register-options` - Get registration options
- `POST /auth/register-verify` - Verify registration
- `POST /auth/login-options` - Get authentication options
- `POST /auth/login-verify` - Verify authentication

## Security Considerations

- All WebAuthn operations follow the latest security standards
- Secure storage of credentials using platform-specific capabilities
- Implementation follows FIDO Alliance best practices
- Cross-Origin Resource Sharing (CORS) properly configured

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
