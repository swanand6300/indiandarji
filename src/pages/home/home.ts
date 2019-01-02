import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { ActionSheetController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  customer;
  itemsRef;
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  callNo;
  constructor(
    public userdetails: UserProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.loader.present();
    this.itemsRef = this.userdetails.getAllUser();
    console.log(this.itemsRef)
    this.itemsRef.subscribe(items => {
      this.customer = [items][0];
      this.customer = this.customer.map(action =>  ({ key: action.key, ...action.payload.val() }));
      this.loader.dismiss();
      this._fnRecordFetchToast("Dashboard updated!");
    });
  }
  _fncallNumber(number) {
    this.callNumber
      .callNumber(number, true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }

  _fnRecordFetchToast(val) {
    const toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  }
  _fnpresentActionSheet(person) {
    var key = person.key;
    const actionSheet = this.actionSheetCtrl.create({
      title: "Modify customer details",
      buttons: [
        {
          text: "Destructive",
          role: "destructive",
          handler: () => {
            this._fnRecordFetchToast("Destructive " + key);
          }
        },
        {
          text: "Archive",
          handler: () => {
            this._fnRecordFetchToast("Archive " + key);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this._fnRecordFetchToast("Cancel " + key);
          }
        }
      ]
    });
    actionSheet.present();
  }
}
