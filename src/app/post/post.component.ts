import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../shared/post.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  //declare variable 
  PostId : number;
  constructor(public postService : PostService,
    private route : ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //get departments
    this.postService.bindListCategory();

    //get empId from activate route
    this.PostId = this.route.snapshot.params['PostId'];

    //getEmployeebyId
    if(this.PostId!=0 || this.PostId != null){
      //get employee
      this.postService.getPostById(this.PostId).subscribe(
        result =>{
          console.log(result);
          //format the date :yyy-MM-dd
          var datepipe = new DatePipe("en-UK");
          let formatedDate : any = datepipe.transform(result.DateofPublish,'yyy-MM-dd');
          result.DateofPublish = formatedDate;

          //asign this resukt to empService formData
          this.postService.formData = Object.assign({},result);
        },
        error =>{
          console.log(error);
        }
      );
    }

  }
  //submit form 
  onSubmit(form : NgForm){
    console.log(form.value);
    let addId = this.postService.formData.PostId;
    
    //insert or update

    if(addId == 0 || addId == null){
      //insert
      this.insertPostRecord(form);
      
    }
    else{
      //update
      this.updatePostRecord(form);
    }
  }

  //insert method 
  insertPostRecord(form?:NgForm){
    console.log("Inserting a record...");
    this.postService.insertPostById(form.value).subscribe(
      result =>{
        console.log(result);
        //calling reset form for clear the contents
        this.resetFrom(form);
        this.toastr.success('Post Record has been inserted','EmpApp v2022');
      },
      (errors) =>{
        console.log(errors);
      }
    );
  }

  //Update method
  updatePostRecord(form?:NgForm){
    console.log("Updating a record...");
    this.postService.UpdatePostById(form.value).subscribe(
      result =>{
        console.log(result);
        //calling reset form for clear the contents
        this.resetFrom(form);
        this.toastr.success('Post Record has been inserted','EmpApp v2022');
      },
      (error) =>{
        console.log(error);
      }
    );
  }


  //clear all contents after submit --reinitialize 
  resetFrom(form?: NgForm){
    if(form != null){
      form.resetForm();
    }
  }

}
