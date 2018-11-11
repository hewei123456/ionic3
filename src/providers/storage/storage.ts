import {Injectable} from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {}

  private typeOfJSON(str) {
    if (typeof str == 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
    console.log('It is not a string!')
  }

  clear() {
    localStorage.clear();
  }


  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }


  setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }


  getItem(key) {
    return localStorage.getItem(key);
  }


  setItem(key, item) {
    localStorage.setItem(key, item);
  }


  delete(key) {
    localStorage.removeItem(key);
  }

  getAll() {
    let results = {};
    let items = Object.keys(localStorage);
    items.forEach((val) => {
      results[val] = this.typeOfJSON(localStorage[val]) ? JSON.parse(localStorage[val]) : localStorage[val];
    });
    return results;
  }
}
