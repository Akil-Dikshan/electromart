import { clerkMiddleware, requireAuth } from '@clerk/express'

//adds Clerk to every request. It reads the auth token from the request headers and makes user info available on req.auth
export const clerkAuth = clerkMiddleware()
//blocks the request if the user is not logged in. Returns 401 if no valid token is found.
export const protectRoute = (req, res, next) => {
  
  const auth = req.auth()
  if (!auth || !auth.userId) {
    return res.status(401).json({ 
      success: false, 
      message: 'Unauthorized. Please sign in.' 
    })
  }

  next()
}