import {
  Inject,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { LoginUserDto, RegisterUseDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async register(data: RegisterUseDto) {
    const newModelUser = new this.userModel(data);

    const hashPassword = await hash(newModelUser.password, 10);
    newModelUser.password = hashPassword;

    const user = await newModelUser.save();

    const { password, ...rta } = user.toJSON();
    return rta;
  }

  async login(data: LoginUserDto) {
    const usuario = await this.userModel.findOne({ email: data.email });

    if (!usuario) {
      throw new UnauthorizedException(`error de email o contraseña`);
    }

    const matchPassword = compareSync(data.password, usuario.password);
    if (!matchPassword) {
      throw new UnauthorizedException(`error de email o contraseña`);
    }

    const token = this.createToken(usuario);

    return token;
  }

  private createToken(usuario: User){
    return sign(
      {
        id: usuario.id,
        role: usuario.role,
        active: usuario.active,
      },
      this.configService.jwt.seed,
      { expiresIn: this.configService.jwt.caducidad }
    );
  }
}
