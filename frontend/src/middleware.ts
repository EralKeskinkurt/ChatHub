import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/register"];

async function verifyJWT(token: string): Promise<boolean> {
    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        await jwtVerify(token, secret);
        return true;
    } catch (_err) {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("access_token")?.value;
    const isPublic = PUBLIC_ROUTES.includes(pathname);

    console.log("Middleware:", { pathname, tokenExists: !!token });

    if (!token && !isPublic) {
        if (pathname !== "/") {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (token) {
        const valid = await verifyJWT(token);

        if (!valid) {
            if (pathname !== "/") {
                return NextResponse.redirect(new URL("/", request.url));
            }
            return NextResponse.next();
        }

        if (isPublic && pathname !== "/interface") {
            return NextResponse.redirect(new URL("/interface", request.url));
        }

        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico).*)"],
};
