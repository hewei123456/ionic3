import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BaseUI} from "../../common/baseui";
import {ToastController} from "ionic-angular";
import {StorageProvider} from "../storage/storage";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider extends BaseUI {
  /* 服务器地址 */
  private baseUrl = 'http://47.94.214.83:8000/';
  /* 登录 */
  private loginApi = this.baseUrl + 'login/';
  /* 获取验证码 */
  private codeApi = this.baseUrl + 'code/';
  /* 获取找回密码验证码 */
  private resetCodeApi = this.baseUrl + 'resetCode/';
  /* 注册、获取用户信息、修改用户基础信息（+id） */
  private usersApi = this.baseUrl + 'users/';
  /* 找回密码 */
  private resetPasswordApi = this.baseUrl + 'resetPassword/';
  /* 拍照修改用户头像 */
  private takePictureApi = this.baseUrl + 'avatar/';
  /* 获取所有省级行政单位列表、选择某省级行政单位下所有市级行政单位列表（+id） */
  private provincesApi = this.baseUrl + 'provinces/';
  /* 选择某市级行政单下所有县级行政单位列表（+id） */
  private citiesApi = this.baseUrl + 'cities/';
  /* 获取所有回收品 */
  private goodsApi = this.baseUrl + 'goods/';
  /* 购物车（增、删、改、查） */
  private cartApi = this.baseUrl + 'shoppingCart/';
  /* 回收地址（增、删、改、查） */
  private addressApi = this.baseUrl + 'address/';
  /* 订单（增、删、改、查） */
  private orderApi = this.baseUrl + 'orders/';

  constructor(public http: HttpClient,
              public toastCtrl: ToastController,
              public storage: StorageProvider) {
    super();
  }

  /* post请求 */
  private postUrlReturn(url: string, data: any, flag: string): Observable<string[]> {
    if (flag == 'common') {
      return this.http.post(url, data)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      let options = {headers: {Authorization: 'Token ' + this.storage.getItem('authorization')}};
      return this.http.post(url, data, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  /* delete请求 */
  private deleteUrlReturn(url: string, flag: string): Observable<string[]> {
    if (flag == 'common') {
      return this.http.delete(url)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      let options = {headers: {Authorization: 'Token ' + this.storage.getItem('authorization')}};
      return this.http.delete(url, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  /* get请求 */
  private getUrlReturn(url: string, flag: string): Observable<string[]> {
    if (flag == 'common') {
      return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      let options = {headers: {Authorization: 'Token ' + this.storage.getItem('authorization')}};
      return this.http.get(url, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  /* put请求 */
  private putUrlReturn(url: string, data: any, flag: string): Observable<string[]> {
    if (flag == 'common') {
      return this.http.put(url, data)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      let options = {headers: {Authorization: 'Token ' + this.storage.getItem('authorization')}};
      return this.http.put(url, data, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  /* 成功回调 */
  private extractData = (res) => {
    console.log(res);
    return res;
  };

  /* 失败回调 */
  private handleError = (error) => {
    console.log(error);
    if (error.status == '400') {
      let errorDict = error.error;
      for (let key in errorDict) {
        this.showToast(this.toastCtrl, errorDict[key]);
        break;
      }
    } else {
      this.showToast(this.toastCtrl, '网络故障！');
    }
    return Observable.throw(error);
  };

  /* 登录 */
  login(username, password): Observable<any> {
    return this.postUrlReturn(this.loginApi, {
      username: username,
      password: password
    }, 'common');
  }

  /* 获取验证码 */
  getCode(mobile, type): Observable<any> {
    if (type == 'register')
      return this.postUrlReturn(this.codeApi, {
        mobile: mobile
      }, 'common');
    else
      return this.postUrlReturn(this.resetCodeApi, {
        mobile: mobile
      }, 'common');
  }

  /* 注册 */
  register(mobile, code, password): Observable<any> {
    return this.postUrlReturn(this.usersApi, {
      mobile: mobile,
      code: code,
      password: password
    }, 'common');
  }

  /* 找回密码 */
  resetPassword(mobile, code, password): Observable<any> {
    let url = this.resetPasswordApi;
    return this.postUrlReturn(url, {
      mobile: mobile,
      code: code,
      password: password
    }, 'common');
  }

  /* 获取用户信息 */
  getUserInfo(): Observable<any> {
    return this.getUrlReturn(this.usersApi, 'authorization');
  }

  /* 修改用户基础信息 */
  updateUserInfo(data): Observable<any> {
    let id = this.storage.getItem('userId');
    let url = this.usersApi + id + '/';
    return this.putUrlReturn(url, data, 'authorization');
  }

  /* 修改用户所属地区信息 */
  updateUserAreaInfo(countyId): Observable<any> {
    let id = this.storage.getItem('userId');
    let url = this.usersApi + id + '/';
    return this.putUrlReturn(url, {
      county: countyId
    }, 'authorization');
  }

  /* 修改用户头像信息 */
  updateUserAvatarInfo(formData): Observable<any> {
    let id = this.storage.getItem('userId');
    let url = this.usersApi + id + '/';
    return this.putUrlReturn(url, formData, 'authorization');
  }

  /* 拍照修改用户头像 传参为base64字符串 */
  takePicture(imagePath, fileName): Observable<any> {
    let id = this.storage.getItem('userId');
    return this.postUrlReturn(this.takePictureApi, {
      avatar: imagePath,
      fileName: fileName,
      userId: id
    }, 'authorization');
  }

  /* 获取所有省级行政单位列表 */
  getProvinces(): Observable<any> {
    return this.getUrlReturn(this.provincesApi, 'common');
  }

  /* 选择某省级行政单位下所有市级行政单位列表 */
  getCities(province_id): Observable<any> {
    let url = this.provincesApi + province_id + '/';
    return this.getUrlReturn(url, 'common');
  }

  /* 选择某市级行政单下所有县级行政单位列表 */
  getCounties(city_id): Observable<any> {
    let url = this.citiesApi + city_id + '/';
    return this.getUrlReturn(url, 'common');
  }

  /* 获取所有回收品 */
  getGoods(): Observable<any> {
    return this.getUrlReturn(this.goodsApi, 'authorization');
  }

  /* 加入购物车 */
  addCart(nums, goods): Observable<any> {
    return this.postUrlReturn(this.cartApi, {
      nums: nums,
      goods: goods
    }, 'authorization');
  }

  /* 获取购物车列表 */
  getCart(): Observable<any> {
    return this.getUrlReturn(this.cartApi, 'authorization');
  }

  /* 删除购物车商品 */
  deleteCart(id): Observable<any> {
    return this.deleteUrlReturn(this.cartApi + id + '/',
      'authorization'
    );
  }

  /* 增加回收地址 */
  addAddress(address, singer_name, singer_mobile): Observable<any> {
    return this.postUrlReturn(this.addressApi, {
      address: address,
      signer_name: singer_name,
      signer_mobile: singer_mobile
    }, 'authorization');
  }

  /* 修改回收地址 */
  updateAddress(id, address, singer_name, singer_mobile): Observable<any> {
    return this.putUrlReturn(this.addressApi + id + '/', {
      address: address,
      signer_name: singer_name,
      signer_mobile: singer_mobile
    }, 'authorization');
  }

  /* 删除回收地址 */
  deleteAddress(id): Observable<any> {
    return this.deleteUrlReturn(this.addressApi + id + '/',
      'authorization'
    );
  }

  /* 获取回收地址列表 */
  getAddresses(): Observable<any> {
    return this.getUrlReturn(this.addressApi, 'authorization');
  }

  /* 增加订单 */
  addOrder(address, singer_name, singer_mobile, post_script, order_time): Observable<any> {
    return this.postUrlReturn(this.orderApi, {
      address: address,
      singer_name: singer_name,
      singer_mobile: singer_mobile,
      post_script: post_script,
      order_time: order_time
    }, 'authorization');
  }

  /* 修改订单 */
  updateOrder(id, address, singer_name, singer_mobile, post_script, order_time): Observable<any> {
    return this.putUrlReturn(this.orderApi + id + '/', {
      address: address,
      singer_name: singer_name,
      singer_mobile: singer_mobile,
      post_script: post_script,
      order_time: order_time
    }, 'authorization');
  }

  /* 删除订单 */
  deleteOrder(id): Observable<any> {
    return this.deleteUrlReturn(this.orderApi + id + '/',
      'authorization'
    );
  }

  /* 获取订单列表 */
  getOrders(): Observable<any> {
    return this.getUrlReturn(this.orderApi, 'authorization');
  }

  /* 获取订单详情 */
  getOrderDetail(id): Observable<any> {
    return this.getUrlReturn(this.orderApi + id + '/', 'authorization');
  }
}
