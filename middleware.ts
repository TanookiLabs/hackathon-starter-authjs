import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/protected")) {
    const signInUrl = new URL("/sign-in", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href)
    return Response.redirect(signInUrl)
  }
})

export const config = {
  matcher: ["/protected/:path*"],
}
