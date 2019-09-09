import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers:[UserService]
})
export class BodyComponent implements OnInit {

  constructor(
    private _service:UserService
  ){ }

  ngOnInit() {
  }

}
