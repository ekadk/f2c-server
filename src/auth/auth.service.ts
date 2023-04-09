import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async signupLocal() {
    return {
      message: 'from signup-local',
    };
  }

  async siginLocal() {
    return {
      message: 'from signin-local',
    };
  }

  async logout() {
    return {
      message: 'from logout',
    };
  }

  async refreshToken() {
    return {
      message: 'from refresh token',
    };
  }
}
