import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { ActionSheetController } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { AlertController } from 'ionic-angular';
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  customer;
  itemsRef;
  searchTerm;
  nopendingOrders: boolean = false;
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  callNo;
  filterDataLength = 1;
  filterData = [];
  constructor(
    public userdetails: UserProvider,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {
    this.loader.present();
    this.initializeItems();
    
  }
  initializeItems(){
    this.itemsRef = this.userdetails.getAllUser();
    this.itemsRef.subscribe(items => {
      this.customer = [items][0];
      this.customer = this.customer.map(action =>  ({ key: action.key, ...action.payload.val() }));
      this.customer.length ? this.nopendingOrders = false : this.nopendingOrders = true; 
      this.filterData = this.customer;
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
      duration: 3000,
    });
    toast.present();
  }
  _fnpresentConfirm(msg, obj) {
    let alert = this.alertCtrl.create({
      title: 'Payment alert',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this._fnRecordFetchToast('Order is completed but payment is pending')
            this.userdetails.completeOrder(obj);
          }
        },
        {
          text: 'Paid',
          handler: () => {
            console.log('Buy clicked');
            this.userdetails.totalAmmountPaid(obj);
          }
        }
      ]
    });
    alert.present();
  }
  _fnpresentActionSheet(person) {
    var key = person.key;
    const actionSheet = this.actionSheetCtrl.create({
      title: "Modify customer details",
      buttons: [
        {
          text: "Mark as complete",
          handler: () => {
            console.log("Check condition")
            console.log((person.advance < person.total));
            if(person.advance < person.total){
              var remAmmount = person.total - person.advance;
              (person.totalAmmountPaid)? this.userdetails.completeOrder(person) : this._fnpresentConfirm('Total ammount is not paid by '+person.name+ '. Please take '+remAmmount+ ' to complete the order! Please click \'paid\' if ammount is paid', person);
            } else{
              this.userdetails.completeOrder(person);
            }
          }
        },
        {
          text: "Mark as paid",
          handler: () => {
            this.userdetails.totalAmmountPaid(person);
          }
        },
        {
          text: "Update",
          handler: () => {
            this._fnRecordFetchToast("Open modal " + key);
          }
        },
        {
          text: "Delete",
          role: 'destructive',
          handler: () => {
            this.userdetails.deleteOrder(person);
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            // this._fnRecordFetchToast("Cancel " + key);
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  onInput(searchTerm){
    this.customer = this.filterData.filter((location) => {
      if(location.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1){ 
        return true;
      }
    });
    this.filterDataLength = this.customer.length;
  }

}
