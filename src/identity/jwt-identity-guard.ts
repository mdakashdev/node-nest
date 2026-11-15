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

        const request = context.switchToHttp().getRequest<{
            headers: { authorization?: string };
            user?: JwtPayload;
        }>();

        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedException('Token is required')
        }

        const token = authHeader.substring(7);

        //verify token

        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token)

            console.log('Method:', request.user);

            request.user = payload;

            console.log('last', request.user)
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }


    }
}