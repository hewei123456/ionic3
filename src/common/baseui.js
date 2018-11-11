/**
 * UI 层的所有公用方法的抽象类
 *
 * @export
 * @abstract
 * @class BaseUI
 */
var BaseUI = /** @class */ (function () {
    function BaseUI() {
        /**
         * 通用的展示 loading 的组件
         *
         * @protected
         * @param {LoadingController} loadingCtrl
         * @param {string} message
         * @returns {Loading}
         * @memberof BaseUI
         */
        this.showLoading = function (loadingCtrl, message) {
            var loader = loadingCtrl.create({
                content: message,
                dismissOnPageChange: true //页面变化的时候自动关闭 loading
            });
            loader.present();
            return loader;
        };
        /**
         * 通用的展示 toast 的组件
         *
         * @protected
         * @param {ToastController} toastCtrl
         * @param {string} message
         * @returns {Toast}
         * @memberof BaseUI
         */
        this.showToast = function (toastCtrl, message) {
            var toast = toastCtrl.create({
                message: message,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
            return toast;
        };
    }
    return BaseUI;
}());
export { BaseUI };
//# sourceMappingURL=baseui.js.map