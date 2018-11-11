import {Component, ViewChild} from '@angular/core';

import {HomePage} from '../home/home';
import {MinePage} from "../mine/mine";
import {OrderPage} from "../order/order";
import {CartPage} from "../cart/cart";
import {NavParams, Tabs} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;
  select: number = 0;

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = OrderPage;
  tab4Root = MinePage;

  constructor(public navParams: NavParams) {
    this.select = this.navParams.get('select') ? this.navParams.get('select') : 0;
  }

  ionViewWillEnter() {
    this.tabRef.select(this.select);
  }
}
