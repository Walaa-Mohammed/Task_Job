import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ICompany } from 'src/app/_models/_interfaces/ICompany';
import { CompanyService } from 'src/app/_services/company.service';
import { environment } from 'src/environments/environment';
import { ConfirmModalComponent } from '../../_reusableComponents/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-compaines',
  templateUrl: './compaines.component.html',
  styleUrls: ['./compaines.component.scss']
})
export class CompainesComponent implements OnInit {
  @ViewChild('addOrUpdateModelCloseBtn') addOrUpdateModelCloseBtn;
  @ViewChild(ConfirmModalComponent) confirmModal:ConfirmModalComponent;
  hasCompaines:boolean = false;
  private _companyToUpdate:ICompany;
  allCompanies:ICompany[];
  errorMsg:string;
  companyForm : FormGroup;
  loading = false;
  submitted = false;
  actionName:string;
  companiesCount:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages:number; // categoriesCount / pageSize
  public response: {dbPath: ''};

  // convenience getter for easy access to form fields
  get formFields() { return this.companyForm.controls; }
  constructor(private _companyService:CompanyService,
    private _formBuilder: FormBuilder,
    private _router:Router,) { }

  ngOnInit(): void {
    this.getCompainesCount();
    this.companyForm = this._formBuilder.group({
      name:['', Validators.required]
    });
    this.getSelectedPage(1);
  }

  private getCompainesCount(){
    this._companyService.getCompinesCount().subscribe(
      data => {
        this.companiesCount = data
        this.numberOfPages = Math.ceil(this.companiesCount / this.pageSize)

      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  private onAddCompanySubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
        return;
      }

    this.loading = true;
    let newCompany:ICompany =
    {
      id:0 ,
      name : this.formFields.name.value,
    };
    this._companyService.addNewCompany(newCompany)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  private onUpdateCompanySubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.companyForm.invalid) {
        return;
      }

    this.loading = true;
    this._companyToUpdate.name = this.formFields.name.value;

    console.log(this._companyToUpdate);
    this._companyService.updateCompany(this._companyToUpdate.id,
      this._companyToUpdate)
        .pipe(first())
        .subscribe(
            data => {
                this._router.routeReuseStrategy.shouldReuseRoute = () => false;
                this._router.onSameUrlNavigation = 'reload';
                this.addOrUpdateModelCloseBtn.nativeElement.click();
                this._router.navigate([this._router.url]);
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }

  onAddOrUpdateSubmit(){
    if(this.actionName == "Add"){
      this.onAddCompanySubmit();
    }else{
      this.onUpdateCompanySubmit()
    }
  }

  openAddCompanyModal(){
    this.formFields.name.setValue("");
    this.actionName = "Add";
  }

  openUpdateCompanyModal(companyId){
    this.actionName = "Update";
    this._companyService.getCompanyById(companyId)
        .pipe(first())
        .subscribe(
            data => {
                this.companyForm.setValue({
                  name: data.name
                });
                this._companyToUpdate = data;
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  openDeleteCompanyModal(companyId){
    this.confirmModal.pointerToFunction = this._companyService.deleteCompany
    this.confirmModal.title = "Delete Company";
    this.confirmModal.itemId = companyId;
    this.confirmModal.message = "Are you sure to delete this company";
    this.confirmModal.pageUrl = this._router.url;
  }

// pagination
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    this._companyService.getCompainesByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allCompanies = data
        this.currentPageNumber = currentPageNumber;
        if(data.length != 0)
          this.hasCompaines = true;
        else
          this.hasCompaines = false;

      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }


}

