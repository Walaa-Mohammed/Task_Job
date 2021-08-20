import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss']
})
export class DashboardSidebarComponent implements OnInit {

  constructor(private _router:Router, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  navigateToCompaines():void{
    this._router.navigate(['compaines'],{relativeTo:this._activatedRoute});
  }

  navigateToEmployees():void{
    this._router.navigate(['employees'],{relativeTo:this._activatedRoute});
  }
  navigateToUsers(): void {
    this._router.navigate(['users'],{relativeTo:this._activatedRoute});
  }


}
