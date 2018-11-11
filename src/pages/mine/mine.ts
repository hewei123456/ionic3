import {Component, ElementRef} from '@angular/core';
import {
  ActionSheetController, AlertController, LoadingController, ModalController, NavController, normalizeURL, Platform,
  ToastController
} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import {StorageProvider} from "../../providers/storage/storage";
import {BaseUI} from "../../common/baseui";
import {AreasProvincesPage} from "../areas-provinces/areas-provinces";
import {LoginPage} from "../login/login";

//导入四个外部组件
import {File} from "@ionic-native/file";
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {AddressPage} from "../address/address";

// 导入第三方的库定义到TS项目中
declare var cordova: any;


/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage extends BaseUI {
  errorMessage: any;
  logined: boolean;
  userInfo: object = {
    area: '',
    avatar: '../../assets/icon/favicon.ico',
    name: '',
    birthday: '',
    email: '',
    gender: 'female',
    identity: 1,
    mobile: '',
    county: null
  };

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController,
              public camera: Camera,
              public transfer: Transfer,
              public file: File,
              public filePath: FilePath,
              public platform: Platform,
              public element: ElementRef,
              public rest: RestProvider,
              public storage: StorageProvider) {
    super();
  }

  ionViewDidEnter() {
    this.loadPage();
  }

  // 页面挂载后调用函数
  loadPage() {
    if (this.storage.getItem('authorization')) {
      this.logined = true;
      this.getUserInfo();
    }
    else {
      this.logined = false;
    }
  }

  // 登录页面
  showLogin() {
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      this.loadPage();
    });
    modal.present();
  }

  // 注销登录
  logout() {
    console.log(this.storage.getAll());
    this.storage.clear();
    this.logined = false;
  }

  // 获取用户信息
  getUserInfo() {
    this.rest.getUserInfo().subscribe(data => {
      this.userInfo = data;
      this.storage.setData('userInfo', this.userInfo);
    }, error => {
      this.errorMessage = <any>error;
    });
  }

  updateUsername() {
    let alert = this.alertCtrl.create({
      title: '修改名字',
      message: '',
      inputs: [
        {
          name: 'name',
          placeholder: '请输入名字'
        }
      ],
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: data => {
            let name = data.name;
            if (name.length == 0) {
              this.showToast(this.toastCtrl, '名字不能为空，修改失败');
              return;
            }
            this.updateUserInfo(name);
          }
        }
      ]
    });
    alert.present();
  }

  updateUserInfo(name) {
    let loading = this.showLoading(this.loadingCtrl, '修改名字');
    let data = {
      name: name
    };
    this.rest.updateUserInfo(data).subscribe(data => {
      loading.dismissAll();
      this.getUserInfo();
      this.showToast(this.toastCtrl, '修改成功')
    }, error => {
      loading.dismissAll();
      this.errorMessage = <any>error;
    });
  }

  jumpToAddress() {
    this.navCtrl.push(AddressPage, {type: 'common'});
  }

  // 选择区域
  showProvince() {
    this.navCtrl.push(AreasProvincesPage);
  }

  // 选择上传方式（相册/拍照）
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [{
        text: '从图片库中选择',
        handler: () => {
          this.triggerUpload();
        }
      }, {
        text: '使用相机',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: '取消',
        handler: () => {

        },
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }

  // 拍照上传修改头像
  takePicture() {
    //定义相机的参数
    let options = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };
    //获取图片的方法
    this.camera.getPicture(options).then(imagePath => {
      this.uploadImage(imagePath);
    }, err => {
      this.showToast(this.toastCtrl, '选择图片出现错误, 请在app中操作或检查相关权限');
    });
  }

  // 上传头像
  uploadImage(imagePath) {
    let url = 'http://47.94.214.83:8000/avatar/',
      targetPath = normalizeURL(imagePath),
      filename = this.createFileName();
    let options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      headers: {Authorization: 'Token ' + this.storage.getItem('authorization')},
      params: {'fileName': filename}
    };

    const fileTransfer: TransferObject = this.transfer.create();
    let loading = this.showLoading(this.loadingCtrl, '上传中...');
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      this.showToast(this.toastCtrl, '修改成功');
      this.loadPage();
    }, err => {
      loading.dismiss();
      this.showToast(this.toastCtrl, '图片上传发生错误, 请重试');
    });
  }

  //为文件生成一个新的文件名
  createFileName() {
    let d = new Date();
    let n = d.getTime();
    let newFileName = n + '.jpg';
    return newFileName
  };

  // 触发选取相册图片
  triggerUpload() {
    let upload = this.element.nativeElement.querySelector('.avatar-file');
    upload.click();
  }

  // 从相册选取图片
  upload(e) {
    let loading = this.showLoading(this.loadingCtrl, '修改头像');
    let formData = new FormData();
    let file = e.target.files[0];
    if (file) {
      formData.append('avatar', file);
      this.rest.updateUserAvatarInfo(formData).subscribe(data => {
        loading.dismissAll();
        e.target.value = '';
        this.showToast(this.toastCtrl, '修改成功');
        this.loadPage();
      }, error => {
        loading.dismissAll();
        e.target.value = '';
        this.errorMessage = <any>error;
      });
    }
  }
}
