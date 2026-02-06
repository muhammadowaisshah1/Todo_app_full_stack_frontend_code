# Todo App Frontend - Next.js

A modern, production-ready Next.js frontend for a multi-user todo application with JWT authentication.

## 🚀 Features

- ✅ Next.js 16+ with App Router
- 🔐 Better Auth with JWT
- 🎨 Tailwind CSS + shadcn/ui
- 📱 Fully responsive design
- ⚡ Server-side rendering
- 🔄 Real-time updates with SWR
- 🎯 Type-safe with TypeScript
- ♿ Accessible components

## 📋 Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend API running

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-frontend-repo-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the frontend directory:

```env
# Authentication (MUST match backend)
BETTER_AUTH_SECRET=your-secret-key-minimum-32-characters
BETTER_AUTH_URL=https://your-frontend-domain.com

# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

**⚠️ CRITICAL**: `BETTER_AUTH_SECRET` must be identical in both frontend and backend!

## 🏃 Running the Application

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build
npm run build

# Start production server
npm start
```

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📱 Features

### Authentication
- User registration with email/password
- Secure login with JWT tokens
- Automatic token refresh
- Protected routes

### Task Management
- Create, read, update, delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status
- Real-time updates

### UI/UX
- Dark/light mode support
- Responsive design (mobile, tablet, desktop)
- Loading states and skeletons
- Toast notifications
- Accessible keyboard navigation

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. Environment variables to add:
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (will be your Vercel URL)
   - `NEXT_PUBLIC_API_URL`

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Docker

```bash
# Build image
docker build -t todo-frontend .

# Run container
docker run -p 3000:3000 todo-frontend
```

## 🔒 Security Features

- JWT-based authentication
- HTTP-only cookies for token storage
- CSRF protection
- XSS prevention
- Secure environment variables
- API request validation

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Authentication pages
│   │   ├── dashboard/    # Protected dashboard
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── auth/         # Auth forms
│   │   ├── tasks/        # Task components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utilities
│   │   ├── auth.ts       # Better Auth config
│   │   ├── api.ts        # API client
│   │   └── utils.ts      # Helper functions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
├── .env.local           # Environment variables (not committed)
├── .env.example         # Environment template
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── README.md           # This file
```

## 🎨 Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for accessible component primitives
- **CSS variables** for theming
- **Dark mode** support

## 🔧 Configuration

### API Client

The API client (`src/lib/api.ts`) automatically:
- Adds JWT token to requests
- Handles authentication errors
- Provides type-safe responses
- Manages error states

### Better Auth

Better Auth configuration in `src/lib/auth.ts`:
- JWT plugin enabled
- Email/password authentication
- Secure session management

## 🐛 Troubleshooting

### "Failed to fetch" errors
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running and accessible
- Verify CORS is configured on backend

### Authentication not working
- Ensure `BETTER_AUTH_SECRET` matches backend
- Check `BETTER_AUTH_URL` matches your domain
- Clear browser cookies and try again

### Build errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check for TypeScript errors with `npx tsc --noEmit`

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `BETTER_AUTH_SECRET` | JWT secret key (32+ chars) | `your-secret-key-here` |
| `BETTER_AUTH_URL` | Frontend URL | `https://app.example.com` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.example.com` |

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🚀 Performance

- Server-side rendering for fast initial load
- Automatic code splitting
- Image optimization with Next.js Image
- SWR for efficient data fetching and caching
- Lazy loading for components

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- Screen reader friendly
- Proper ARIA labels
- Focus management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation
- Review Next.js docs

---

Built with ❤️ using Next.js 16
