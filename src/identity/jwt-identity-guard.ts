import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from "@nestjs/common";

import {JwtService} from "@nestjs/jwt";

export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtIdentityGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        //1. HTTP Request Receive
        const request = context.switchToHttp().getRequest<{
            headers: { authorization?: string };
            user?: JwtPayload;
        }>();

        //2. get token from Header
        const authHeader = request.headers.authorization;

        //3. Token Check
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedException('Token is required')
        }

        //4. get token
        const token = authHeader.substring(7);

        //5. verify token
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token)

            console.log('Method:', request.user);

            // put payload in request
            request.user = payload;

            console.log('last', request.user)
            return true;
        } catch {
            //6. Invalid Token
            throw new UnauthorizedException('Invalid or expired token');
        }


    }
}