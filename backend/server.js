const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Middleware - Globally Enable
app.use(cors());

// ✅ JSON Middleware
app.use(express.json());

// ✅ Mock Data Array (Matching Frontend TypeScript Interfaces)
// ✅ 50 Posts with Unique userId (1-50)
const posts = [
  {
    id: 1,
    userId: 1,
    title: "Getting Started with React Query",
    body: "React Query is a powerful data-fetching library that simplifies server-state management. It handles caching, background updates, and stale data out of the box. Start by installing @tanstack/react-query and wrapping your app with QueryClientProvider."
  },
  {
    id: 2,
    userId: 2,
    title: "Understanding CORS in Modern Web Apps",
    body: "Cross-Origin Resource Sharing is a security mechanism that restricts web pages from making requests to different domains. By default, browsers block cross-origin requests. To fix this, you need to configure CORS on your backend server using the cors() middleware."
  },
  {
    id: 3,
    userId: 3,
    title: "10 Essential VS Code Extensions for Developers",
    body: "Visual Studio Code is the most popular code editor among developers. Some essential extensions include: Prettier for code formatting, ESLint for linting, Tailwind CSS IntelliSense, and GitLens for Git history visualization."
  },
  {
    id: 4,
    userId: 4,
    title: "Mastering TanStack Query Pagination",
    body: "When dealing with large datasets, pagination is crucial. TanStack Query supports paginated queries with keepPreviousData. This feature prevents UI flashing when changing pages by showing stale data while fetching fresh data in the background."
  },
  {
    id: 5,
    userId: 5,
    title: "Tailwind CSS V4: What's New?",
    body: "Tailwind CSS V4 introduces significant improvements including new color palette, better dark mode support, and the new @custom-variant directive. The latest version also supports CSS-native @import for better performance."
  },
  {
    id: 6,
    userId: 6,
    title: "Building a REST API with Express.js",
    body: "Express.js is a minimal and flexible Node.js web application framework. To build a REST API, start with npm init, install express and cors, create routes for GET, POST, PUT, DELETE operations, and handle request/response cycles."
  },
  {
    id: 7,
    userId: 7,
    title: "TypeScript Generics: A Complete Guide",
    body: "Generics are a powerful TypeScript feature that allows you to create reusable components. They enable you to define types that work with multiple types of data. Use generics for API responses, pagination interfaces, and custom hooks."
  },
  {
    id: 8,
    userId: 8,
    title: "Why You Need Environment Variables",
    body: "Environment variables are essential for managing configuration across different environments. Use dotenv to load variables from .env files. Never hardcode sensitive data like API keys, database URLs, or secret tokens in your code."
  },
  {
    id: 9,
    userId: 9,
    title: "Optimizing React Performance with Memoization",
    body: "Memoization is a performance optimization technique that caches the results of expensive function calls. In React, use React.memo for component memoization, useMemo for expensive calculations, and useCallback for function references."
  },
  {
    id: 10,
    userId: 10,
    title: "Database Design Best Practices",
    body: "Good database design is crucial for application performance. Normalize your data to reduce redundancy, use proper indexes for faster queries, and always implement proper relationships between tables using foreign keys."
  },
  {
    id: 11,
    userId: 11,
    title: "Authentication vs Authorization Explained",
    body: "Authentication verifies who a user is (login). Authorization determines what a user can do (permissions). Implement JWT tokens for stateless authentication and RBAC (Role-Based Access Control) for managing permissions."
  },
  {
    id: 12,
    userId: 12,
    title: "Understanding the JavaScript Event Loop",
    body: "JavaScript is single-threaded but non-blocking. The event loop allows asynchronous operations by using a call stack, task queue, and microtask queue. Understanding the event loop is essential for writing efficient asynchronous code."
  },
  {
    id: 13,
    userId: 13,
    title: "Debugging React Applications Like a Pro",
    body: "Effective debugging is a key skill for React developers. Use React DevTools for inspecting component hierarchy, Redux DevTools for state management, and Chrome DevTools for network requests, performance profiling, and error tracking."
  },
  {
    id: 14,
    userId: 14,
    title: "Why Use TypeScript Over JavaScript?",
    body: "TypeScript offers static typing, better IDE support, enhanced code maintainability, and early error detection. It helps prevent common JavaScript errors like undefined/null issues, type mismatches, and ensures API contracts are maintained."
  },
  {
    id: 15,
    userId: 15,
    title: "The Future of AI in Web Development",
    body: "AI is transforming web development with tools like GitHub Copilot, ChatGPT, and AI-powered code generators. These tools help with code completion, bug detection, documentation generation, and even writing entire features from prompts."
  },
  {
    id: 16,
    userId: 16,
    title: "Mastering CSS Grid and Flexbox",
    body: "CSS Grid is perfect for 2D layouts while Flexbox excels at 1D layouts. Both are essential for modern responsive web design. Use Grid for page layouts and Flexbox for component-level arrangements. Combine them for powerful designs."
  },
  {
    id: 17,
    userId: 17,
    title: "Building a Kanban Board with React",
    body: "A Kanban board is a project management tool. Build one with React using state management, drag-and-drop, and real-time updates. Integrate it with TanStack Query for server-state management and achieve a smooth user experience."
  },
  {
    id: 18,
    userId: 18,
    title: "Clean Code Principles for JavaScript",
    body: "Write clean, readable, and maintainable code. Follow principles like meaningful variable names, single responsibility functions, avoid side effects, keep functions small, and always write comments explaining the 'why' not the 'what'."
  },
  {
    id: 19,
    userId: 19,
    title: "Setting Up Nginx as a Reverse Proxy",
    body: "Nginx is a powerful web server that can act as a reverse proxy. It can serve static files, load balance between multiple servers, handle SSL termination, and improve performance with caching. Essential for production deployments."
  },
  {
    id: 20,
    userId: 20,
    title: "The Importance of Code Reviews",
    body: "Code reviews improve code quality, share knowledge, and catch bugs early. Establish a review process with clear guidelines, use tools like GitHub pull requests, and ensure everyone participates. A good review culture makes a strong team."
  },
  {
    id: 21,
    userId: 21,
    title: "Responsive Design Techniques in 2026",
    body: "Responsive design ensures your site works on all devices. Use CSS media queries, fluid grids, flexible images, and modern CSS features like container queries. Test on real devices and use browser dev tools for responsive debugging."
  },
  {
    id: 22,
    userId: 22,
    title: "Getting Started with PostgreSQL",
    body: "PostgreSQL is a powerful open-source relational database. Learn about tables, schemas, indexes, views, and stored procedures. Use pgAdmin or psql for management and connect your Node.js apps using pg or Sequelize for ORM."
  },
  {
    id: 23,
    userId: 23,
    title: "Understanding Web Accessibility (WCAG)",
    body: "Accessibility ensures all users can access your content. Follow WCAG guidelines including proper semantic HTML, ARIA attributes, keyboard navigation, color contrast ratios, and screen reader support. Inclusive design makes better products."
  },
  {
    id: 24,
    userId: 24,
    title: "State Management in React: Redux vs Zustand",
    body: "Both Redux and Zustand are popular state management solutions. Redux offers predictability with strict patterns, while Zustand provides a simpler API. Choose Redux for large apps with complex state, and Zustand for smaller to medium apps."
  },
  {
    id: 25,
    userId: 25,
    title: "Building Microservices Architecture",
    body: "Microservices break down applications into small, independently deployable services. Each service handles a specific business capability. Use REST APIs or gRPC for communication, and implement API gateways for client-side routing."
  },
  {
    id: 26,
    userId: 26,
    title: "Continuous Integration and Deployment (CI/CD)",
    body: "CI/CD automates the build, test, and deployment processes. Use GitHub Actions, GitLab CI, or Jenkins to run tests on every push and deploy to staging/production automatically. It reduces manual errors and speeds up development cycles."
  },
  {
    id: 27,
    userId: 27,
    title: "The Power of Docker for Developers",
    body: "Docker containers package applications with their dependencies, ensuring consistency across environments. Use Docker Compose for multi-container applications, and Dockerfile for custom images. It's essential for modern development workflows."
  },
  {
    id: 28,
    userId: 28,
    title: "12-Factor App Methodology",
    body: "The 12-factor app methodology is a set of best practices for building scalable web applications. It covers codebase management, dependencies, configuration, backing services, build/release/run stages, processes, port binding, and more."
  },
  {
    id: 29,
    userId: 29,
    title: "Understanding WebSockets for Real-Time Apps",
    body: "WebSockets enable full-duplex communication between client and server. They're perfect for real-time applications like chat, gaming, and live updates. Use Socket.io for a robust WebSocket implementation with automatic fallback options."
  },
  {
    id: 30,
    userId: 30,
    title: "Exploring GraphQL for APIs",
    body: "GraphQL is a query language for APIs that allows clients to request specific data. It reduces over-fetching and under-fetching compared to REST. Use Apollo Server for backend and Apollo Client for frontend integration."
  },
  {
    id: 31,
    userId: 31,
    title: "Mastering Next.js for Production",
    body: "Next.js is a powerful React framework with built-in SSR, static site generation, and API routes. It offers automatic code splitting, image optimization, and file-based routing. Perfect for production-ready React applications."
  },
  {
    id: 32,
    userId: 32,
    title: "Understanding OAuth 2.0",
    body: "OAuth 2.0 is the industry-standard protocol for authorization. It allows third-party apps to access user data without exposing credentials. Learn about flows (PKCE, client credentials), scopes, refresh tokens, and various grant types."
  },
  {
    id: 33,
    userId: 33,
    title: "Web Performance Optimization Techniques",
    body: "Performance is critical for user experience. Optimize with lazy loading, code splitting, image optimization (WebP, SVG), browser caching, CDN usage, minimize bundle size, and use tools like Lighthouse, Web Vitals for measurement."
  },
  {
    id: 34,
    userId: 34,
    title: "The Rise of Serverless Architecture",
    body: "Serverless allows you to run code without managing servers. Providers like AWS Lambda, Vercel, Netlify handle infrastructure. You pay per execution, scale automatically, and focus entirely on code. Perfect for microservices and APIs."
  },
  {
    id: 35,
    userId: 35,
    title: "Testing Strategies for Modern Web Apps",
    body: "Comprehensive testing is essential. Use unit tests (Jest, Vitest), integration tests (React Testing Library), end-to-end tests (Cypress, Playwright), and API tests (Postman, Supertest). Follow the testing pyramid for optimal coverage."
  },
  {
    id: 36,
    userId: 36,
    title: "How to Secure Your React Applications",
    body: "React app security is crucial. Protect against XSS by escaping user input, use HTTPS, implement Content Security Policy, sanitize HTML with DOMPurify, use secure JWT storage, implement rate limiting, and keep dependencies updated."
  },
  {
    id: 37,
    userId: 37,
    title: "Creating Reusable React Components",
    body: "Reusable components improve code quality and reduce duplication. Use TypeScript for props typing, avoid prop drilling with composition, implement Compound Components pattern, use custom hooks for logic extraction, and document with Storybook."
  },
  {
    id: 38,
    userId: 38,
    title: "The Art of Writing Clean APIs",
    body: "Clean APIs follow RESTful principles: use proper HTTP methods (GET, POST, PUT, DELETE), meaningful resource naming, proper status codes, consistent error formatting, and good documentation with OpenAPI/Swagger specifications."
  },
  {
    id: 39,
    userId: 39,
    title: "Understanding Browser Developer Tools",
    body: "Browser DevTools are essential for debugging. Master Elements (HTML/CSS), Console (JavaScript logs), Sources (breakpoints), Network (HTTP requests), Performance (profiling), Memory (heap snapshots), and Application (storage/cookies)."
  },
  {
    id: 40,
    userId: 40,
    title: "Cross-Browser Compatibility in 2026",
    body: "Modern web development requires cross-browser compatibility. Use feature detection (Modernizr, caniuse), progressive enhancement, fallbacks, and test across browsers (Chrome, Firefox, Safari, Edge). Use tools like BrowserStack for testing."
  },
  {
    id: 41,
    userId: 41,
    title: "Implementing Dark Mode with Tailwind CSS",
    body: "Dark mode improves accessibility and user experience. With Tailwind CSS, use the dark: variant for dark mode styles. Enable dark mode with darkMode: 'class' in config, and toggle using JavaScript to add/remove 'dark' class on html element."
  },
  {
    id: 42,
    userId: 42,
    title: "Webhooks: Automating Workflows",
    body: "Webhooks allow real-time communication between applications. They're HTTP callbacks triggered by events. Common uses include GitHub webhooks for CI/CD, Stripe webhooks for payment events, and Zapier/Make for connecting multiple apps."
  },
  {
    id: 43,
    userId: 43,
    title: "Understanding JSON Web Tokens (JWT)",
    body: "JWTs are compact, self-contained tokens for secure information exchange. They consist of header, payload, and signature. Use for authentication, secure API endpoints. Store securely in httpOnly cookies, not localStorage for security reasons."
  },
  {
    id: 44,
    userId: 44,
    title: "Managing State with React Hooks",
    body: "React Hooks revolutionized state management. Use useState for local state, useEffect for side effects, useContext for global state, useReducer for complex state, useCallback for memoized functions, and useMemo for expensive computations."
  },
  {
    id: 45,
    userId: 45,
    title: "Building REST APIs with Express and TypeScript",
    body: "TypeScript with Express enhances API development with type safety. Define route handlers, use interfaces for requests/responses, implement error handling middleware, use class-validator for input validation, and generate OpenAPI docs."
  },
  {
    id: 46,
    userId: 46,
    title: "Why You Should Use Linters and Formatters",
    body: "Linters (ESLint) catch code issues while formatters (Prettier) maintain consistent style. They improve code quality, reduce bugs, and save time in code reviews. Configure with rules for your team and integrate with pre-commit hooks."
  },
  {
    id: 47,
    userId: 47,
    title: "The Rise of Edge Computing",
    body: "Edge computing processes data closer to the source, reducing latency. CDNs are the simplest edge implementation. Platforms like Cloudflare Workers, Vercel Edge, and Netlify Edge allow running code globally with minimal latency."
  },
  {
    id: 48,
    userId: 48,
    title: "Security Headers Every Website Should Have",
    body: "Security headers protect your site from common attacks. Essential headers: Content-Security-Policy (prevent XSS), X-Frame-Options (clickjacking), Strict-Transport-Security (force HTTPS), X-Content-Type-Options (prevent MIME sniffing)."
  },
  {
    id: 49,
    userId: 49,
    title: "Evolution of JavaScript: ES5 to ES2026",
    body: "JavaScript has evolved significantly with features like arrow functions, async/await, destructuring, spread/rest operators, optional chaining, nullish coalescing, and top-level await. Stay updated with TC39 proposals for future features."
  },
  {
    id: 50,
    userId: 50,
    title: "Building Micro-Frontends with Module Federation",
    body: "Micro-frontends enable multiple teams to deploy independent features. Webpack 5 Module Federation allows sharing code between applications. It's perfect for large enterprise applications with multiple independent development teams."
  }
];
// ✅ Routes

// GET /api/data - All posts with pagination support
app.get('/api/data', (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;
  const search = req.query.q || '';

  // Search filter
  let filteredPosts = posts;
  if (search) {
    filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredPosts.slice(startIndex, endIndex);

  // Response with pagination metadata
  res.json({
    data: paginatedData,
    totalCount: filteredPosts.length,
    currentPage: page,
    totalPages: Math.ceil(filteredPosts.length / limit),
    hasNextPage: page < Math.ceil(filteredPosts.length / limit),
    hasPrevPage: page > 1,
    limit: limit
  });
});

// GET /api/data/:id - Single post
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// GET /api/posts - Alternative endpoint (JSONPlaceholder compatible)
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query._page) || 1;
  const limit = parseInt(req.query._limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = posts.slice(startIndex, endIndex);

  res.json(paginatedData);
});

// GET /api/posts/:id - Single post (JSONPlaceholder compatible)
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Kanban Board API',
    endpoints: {
      data: 'GET /api/data',
      dataWithPagination: 'GET /api/data?_page=1&_limit=10',
      singlePost: 'GET /api/data/:id',
      posts: 'GET /api/posts',
      postsWithPagination: 'GET /api/posts?_page=1&_limit=10',
      singlePostAlt: 'GET /api/posts/:id',
      health: 'GET /api/health'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/data`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});