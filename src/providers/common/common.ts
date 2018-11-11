import {Injectable} from '@angular/core';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor() {}

  regPhone(userPhone): boolean {
    let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phoneReg.test(userPhone)) {
      return false
    }
    return true
  }

  regCode(code): boolean {
    let codeReg = /^[0-9]{4}$/;
    if (!codeReg.test(code)) {
      return false
    }
    return true
  }

  regPassword(userPwd): boolean {
    if (userPwd.length == 0) {
      return false
    }
    return true
  }
}
