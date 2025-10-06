# Tickets App

## Description
The Tickets App is a ticket management system designed to help users create, view, and manage tickets efficiently. Built with Next.js and Ant Design, it provides a modern and responsive user interface.

## Features
- Create new tickets with title, description, and priority.
- View ticket details and edit their status.
- Search and filter tickets in a table view.
- Responsive design with dynamic theming.

## Technologies Used
- **Next.js**: Framework for server-side rendering and static site generation.
- **Ant Design**: UI library for building elegant and consistent user interfaces.
- **TypeScript**: Strongly typed programming language for better code quality.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tickets-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tickets-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Environment Variables
Ensure the following environment variables are set in a `.env.local` file:
```
NEXT_PUBLIC_NAME=Tickets App
NEXT_PUBLIC_VERSION=1.0.0
```

## Folder Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── (header-layout)/
│   │   ├── tickets/
│   │   │   ├── [id]/page.tsx
│   │   │   ├── create/page.tsx
├── components/
│   ├── forms/
│   │   ├── CardTicket.tsx
│   │   ├── FormTicket.tsx
│   ├── TableTickets.tsx
```

## License
This project is licensed under the MIT License.