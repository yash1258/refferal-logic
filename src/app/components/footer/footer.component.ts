import { Component, OnInit } from '@angular/core';
//import { fa, faTv, faRocket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import {faFacebook, faTelegram, faTwitter, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faFacebook = faFacebook;
  faTelegram = faTelegram;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
