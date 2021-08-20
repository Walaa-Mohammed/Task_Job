import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ICompany } from 'src/app/_models/_interfaces/ICompany';
import { IEmployee } from 'src/app/_models/_interfaces/IEmployee';
import { IEmployeeVM } from 'src/app/_models/_interfaces/IEmployeeVM';
import { CompanyService } from 'src/app/_services/company.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { environment } from 'src/environments/environment';
import { ConfirmModalComponent } from '../../_reusableComponents/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  @ViewChild('addOrUpdateModelCloseBtn') addOrUpdateModelCloseBtn;
  @ViewChild(ConfirmModalComponent) confirmModal:ConfirmModalComponent;
  hasEmployees:boolean = false;
  private _EmployeeToUpdate:IEmployee;
  allEmployees:IEmployeeVM[];
  allcompaines:ICompany[];
  genderList = ["male", "female"]

  errorMsg:string;
  employeeForm : FormGroup;
  loading = false;
  submitted = false;
  actionName:string;
  employeesCount:number;
  pageSize:number = 8;
  currentPageNumber:number = 1;
  numberOfPages:number;
  public response = {dbPath: ''};

  // convenience getter for easy access to form fields
  get formFields() { return this.employeeForm.controls; }
  constructor(private _employeeService:EmployeeService,
    private _formBuilder: FormBuilder,
    private _router:Router,private _companyService:CompanyService) { }

  ngOnInit(): void {
    this._employeeService.getEmployeesCount().subscribe(
      data => {
        this.employeesCount = data
        this.numberOfPages = Math.ceil(this.employeesCount / this.pageSize)
      },
      error=>
      {
       this.errorMsg = error;
      }
    )

    this.employeeForm = this._formBuilder.group({
      firstName:['', [Validators.required,Validators.minLength(3)]],
      lastName:['', [Validators.required,Validators.minLength(3)]],

      address:['', [Validators.required,Validators.minLength(5)]],
      country:['', [Validators.required,Validators.minLength(10)]],

      companyId:['', Validators.required],
      gender:['', Validators.required],
    });
    this.getSelectedPage(1);
   //get all categories
   this._companyService.getAllCompaines().subscribe(
    data => {
      this.allcompaines = data

    },
    error=>
    {
     this.errorMsg = error;
    }
  )

  }

  private onAddEmployeeSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
        return;
      }

    this.loading = true;
    let newEmployee:IEmployee = {
      id:0 ,
      firstName : this.formFields.firstName.value,
      lastName : this.formFields.lastName.value,
      gender: this.formFields.gender.value,
      address: this.formFields.address.value,
      country:this.formFields.country.value,
      image : this.response.dbPath,
      companyId: this.formFields.companyId.value,
    };
    this._employeeService.addNewEmployee(newEmployee)
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

  private onUpdateEmployeeSubmit(){
    console.log(this.response);
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
        return;
      }

    this.loading = true;
    this._EmployeeToUpdate.firstName = this.formFields.firstName.value;
    this._EmployeeToUpdate.lastName = this.formFields.lastName.value;

    this._EmployeeToUpdate.address = this.formFields.address.value;
    this._EmployeeToUpdate.country = this.formFields.country.value;
    this._EmployeeToUpdate.gender = this.formFields.gender.value;
    if(this.response.dbPath != ''){ // if the user doesn't change the image
      this._EmployeeToUpdate.image = this.response.dbPath;
    }
    this._EmployeeToUpdate.companyId = this.formFields.companyId.value;
    console.log(this._EmployeeToUpdate);
    this._employeeService.updateEmployee(this._EmployeeToUpdate.id, this._EmployeeToUpdate)
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
      this.onAddEmployeeSubmit();
    }else{
      this.onUpdateEmployeeSubmit()
    }
  }

  openAddEmployeeModal(){
    this.actionName = "Add";
    this.employeeForm.setValue({
      firstName: "",
      lastName: "",
      gender:"Select Gender",
      address:"",
      country:"",
      companyId:"Select Company"
    });
  }

  openUpdateEmployeeModal(EmployeeId){
    this.actionName = "Update";
    this._employeeService.getEmployeeById(EmployeeId)
        .pipe(first())
        .subscribe(
            data => {
                this.employeeForm.setValue({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  gender:data.gender,

                  address:data.address,
                  country:data.country,
                  companyId:data.companyId,
                });
                this._EmployeeToUpdate = data;
            },
            error => {
                this.errorMsg = error;
                this.loading = false;
            });
  }
  openDeleteEmployeeModal(EmployeeId){
    this.confirmModal.pointerToFunction = this._employeeService.deletEemployee
    this.confirmModal.title = "Delete Employee";
    this.confirmModal.itemId = EmployeeId;
    this.confirmModal.message = "Are you sure to delete this Employee";
    this.confirmModal.pageUrl = this._router.url;
  }

  // pagination
  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber:number){
    this._employeeService.getEmployeesByPage(this.pageSize,currentPageNumber).subscribe(
      data => {
        this.allEmployees = data
        this.currentPageNumber = currentPageNumber;
        if(data.length != 0)
          this.hasEmployees = true;
        else
          this.hasEmployees = false;

      },
      error=>
      {
       this.errorMsg = error;
      }
    )
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
