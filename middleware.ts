import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes (from the old version)
const publicRoutes = createRouteMatcher([
  '/',
  '/events/:id',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

// Define ignored routes (from the old version)
const ignoredRoutes = createRouteMatcher([
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

// Define middleware
export default clerkMiddleware(async (auth, request) => {
  // Only protect routes not listed as public
  if (!publicRoutes(request)) {
    await auth.protect(); // Protect routes that aren't public
  }
});

// Export middleware configuration
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};