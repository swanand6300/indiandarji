import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  customer;

  constructor(public db: AngularFireDatabase,public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,) {
    console.log("Hello UserProvider Provider");
  }
  _fnRecordFetchToast(val) {
    const toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  }
  getAllUser() {
    return this.db
      .list("/darji")
      .snapshotChanges();
  }
  addUser(userdetails){
    this.db.list("/darji").push(userdetails).then((res) => {
      this._fnRecordFetchToast('User added successfully!')
    })
  }
}
