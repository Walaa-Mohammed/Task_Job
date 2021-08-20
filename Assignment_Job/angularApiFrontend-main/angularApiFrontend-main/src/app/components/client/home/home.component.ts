import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICompany } from 'src/app/_models/_interfaces/ICompany';
import { IEmployeeVM } from 'src/app/_models/_interfaces/IEmployeeVM';
import { CompanyService} from 'src/app/_services/company.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errorMsg:string;
  constructor( ) { }

  // owl carousel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    stagePadding:150,
    margin:30,
    autoplayTimeout: 3000,
		autoplayHoverPause: true,
    dots: false,
    autoplay:true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        stagePadding: 100,
        items: 1
      },
      400: {
        stagePadding: 100,
        items: 2
      },
      760: {
        stagePadding: 130,
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {

  }



}
