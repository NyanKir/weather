import { IUser, UserModel } from '@/models/user';
import { ErrorBuilder, HttpException } from '@exceptions/http.exception';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY, SESSION_TTL } from '@config';
import { SessionModel } from '@/models/session';
import dayjs from 'dayjs';

export class AuthService {
  tokenExpires: number = 60 * 10;
  sessionExpires: number = Number(SESSION_TTL);

  private async createToken(
    id: string | Uint8Array,
    expiresIn: number = 60 * 60
  ) {
    return {
      expiresIn,
      token: sign(
        {
          _id: id
        },
        SECRET_KEY,
        { expiresIn }
      )
    };
  }

  private async createCookie(tokenData: { token: any; expiresIn: number }) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  async signup(userData: IUser) {
    const exist = await UserModel.findOne({ email: userData.email });

    if (exist) throw new HttpException(409, `This email already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const user: IUser = await UserModel.create({
      email: userData.email,
      password: hashedPassword
    });
    return {
      email: user.email
    };
  }

  async login(userData: IUser) {
    const exist = await UserModel.findOne({ email: userData.email });
    if (!exist) throw new HttpException(409, `This email was not found`);

    const isMatch = await compare(userData.password, exist.password);
    if (!isMatch) throw new HttpException(409, `Password is not matching`);

    const count = await SessionModel.count({ user: exist.id });
    if (count > 2) {
      await SessionModel.deleteMany({ user: exist.id });
    }

    const token = await this.createToken(exist.id, this.tokenExpires);
    const session = await SessionModel.create({
      expiresAt: dayjs(new Date()).add(this.sessionExpires, 'seconds'),
      user: exist
    });
    const cookie = await this.createCookie({
      token: session.id,
      expiresIn: this.sessionExpires
    });

    return {
      cookie,
      email: exist.email,
      token: token.token
    };
  }

  async refreshToken(sessionId: unknown) {
    if (typeof sessionId === 'string') {
      const exist = await SessionModel.findById(sessionId).populate('user');

      if (!exist || !exist?.user) throw ErrorBuilder.Forbidden();

      const count = await SessionModel.count({ user: exist.id });
      if (count > 2) {
        await SessionModel.deleteMany({ user: exist.id });
      }
      console.log(exist.toJSON(), exist.user?._id?.toHexString());

      const token = await this.createToken(
        exist.user._id.toHexString(),
        this.tokenExpires
      );
      const session = await SessionModel.create({
        expiresAt: dayjs(new Date()).add(this.sessionExpires, 'seconds'),
        user: exist
      });
      await SessionModel.findByIdAndDelete(exist.id);
      const cookie = await this.createCookie({
        token: session.id,
        expiresIn: this.sessionExpires
      });
      return {
        token,
        cookie
      };
    }
    throw ErrorBuilder.Forbidden();
  }

  async logOut(sessionId: unknown) {
    if (typeof sessionId === 'string') {
      await SessionModel.findByIdAndDelete(sessionId);
    }
  }
}
