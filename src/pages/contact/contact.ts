import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { UserProvider } from "../../providers/user/user";
import { UserDetails } from '../models/user.model';
import { HomePage } from '../home/home';
@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  user = {} as UserDetails;
  
  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public userService: UserProvider) {
    this.user.takendate = new Date().toISOString();
    this.user.duedate = new Date().toISOString();
    this.user.isOrderCompleted = false;
    this.user.totalAmmountPaid = false;
  }

  _fncreateUser(customerDetails) {
    this.userService.addUser(this.user);
    customerDetails.resetForm();
    this.user.takendate = new Date().toISOString();
    this.user.duedate = new Date().toISOString();
    this.navCtrl.push(HomePage);
  }
}

