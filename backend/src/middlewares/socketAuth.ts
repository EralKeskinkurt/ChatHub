import { ExtendedError, Socket } from "socket.io";

declare module "socket.io" {
    interface Socket {
        user?: any;
    }
}

import { verifyTokens } from "../utils/tokens/authToken";

export function socketAuthMiddleware(
    socket: Socket, next: (err?: ExtendedError) => void
) {
    const cookies = socket.handshake.headers.cookie;
    const token = cookies
        ?.split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    if (!token) {
        return next(new Error("Authentication error: No token provided"));
    }

    try {

        const decoded = verifyTokens(token, "access");

        if (!socket) next(new Error("Authentication error: No token provided"));
        socket.user = decoded;
        next();
    } catch (_err) {
        next(new Error("Authentication error: Invalid token"));
    }
}