import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class BanGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()

    try {
      const authHeader = req.headers.authorization;

      if(!authHeader){
        return true;
      }

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({message: 'Пользователь не авторизован'})
      }

      const user = this.jwtService.verify(token);

      if(user.isBanned){
        throw new HttpException("Пользователь заблокирован", HttpStatus.BAD_REQUEST);
      }

      req.user = user;
      return true;
    } catch (e) {
      throw e;
    }
  }

}