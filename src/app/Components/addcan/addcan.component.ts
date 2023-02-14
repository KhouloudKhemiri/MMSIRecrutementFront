import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandService } from 'src/app/Services/cand/cand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcan',
  templateUrl: './addcan.component.html',
  styleUrls: ['./addcan.component.css']
})
export class AddcanComponent implements OnInit {
  formGroup!: FormGroup;
  
  fileToUpload!: File[];
  constructor(private candse:CandService,private form:FormBuilder, private router:Router){}
  ngOnInit(): void {
    this.formGroup=this.form.group({nom:['',Validators.required],prenom:['',Validators.required],tel:['',Validators.required],email:['',Validators.required],
   password:['',Validators.required],adress:['',Validators.required]})
  }
  addUser(){
    let formData =new FormData();
  formData.append("nom",this.formGroup.value.nom);
  formData.append("prenom",this.formGroup.value.prenom);
  
  formData.append("tel",this.formGroup.value.tel);
  formData.append("email",this.formGroup.value.email);
  formData.append("password",this.formGroup.value.password);
  formData.append("file",this.fileToUpload[0]);
  formData.append("adress",this.formGroup.value.adress);
  this.candse.addcand(formData).subscribe(
    resultat=>{console.log(resultat);
      Swal.fire('','Ajouter avec succès','success');}
  )
  }
  handleFileInput(files: any) {
    this.fileToUpload = <Array<File>>files.target.files;
    console.log(this.fileToUpload)
  }



}
