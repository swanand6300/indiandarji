import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { UserProvider } from "../../providers/user/user";
@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  user =  {
    address : '',
  advance : '',
  duedate : '',
  mobile : '',
  name : '',
  takendate : '',
  total : ''
  }
  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public userService: UserProvider) {}

  _fncreateUser(obj) {
    console.log(obj)
    this.userService.addUser(obj.value);
  }
}

