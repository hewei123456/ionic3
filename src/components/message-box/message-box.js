var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
// import {Input} from "@angular/compiler/src/core";
/**
 * Generated class for the MessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MessageBoxComponent = /** @class */ (function () {
    function MessageBoxComponent() {
        this.text = 'Hello World';
        console.log(this.message);
    }
    // component 没有生命周期函数 ngAfterContentInit构造方法
    MessageBoxComponent.prototype.ngAfterContentInit = function () {
        console.log(this.message);
    };
    __decorate([
        Input('message'),
        __metadata("design:type", Object)
    ], MessageBoxComponent.prototype, "message", void 0);
    MessageBoxComponent = __decorate([
        Component({
            selector: 'message-box',
            templateUrl: 'message-box.html'
        }),
        __metadata("design:paramtypes", [])
    ], MessageBoxComponent);
    return MessageBoxComponent;
}());
export { MessageBoxComponent };
//# sourceMappingURL=message-box.js.map