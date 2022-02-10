import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/shared/post';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {

  postArray : Array<Post> = [];
  newAttributes : any = {};
  
  constructor(public postService : PostService,
    private route : ActivatedRoute,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.postService.bindListPosts();
    this.postService.bindListCategory();
  }

  addFieldValue(){
    this.newAttributes.PostId = this.route.snapshot.params['PostId'];
    if(this.postArray.length > 0){
      this.newAttributes.CategoryId = this.postArray[0].CategoryId;
    }
    this.postArray.push(this.newAttributes)
    console.log(this.postArray);
    this.newAttributes = {};
  }
  onSubmit(){
    console.log("---Post");
    for (let i = 0; i < this.postArray.length; i++) {
      this.postService.insertPostById(this.postArray[i]).subscribe(
        (result) =>{
          console.log(result);
        },
        (error) =>{
          console.log(error);
        }
      );
    }
    this.resetForm();
    this.toastr.show("Successfully added all posts","Category Insertion");
  }

  deleteValue(index){
    this.postArray.splice(index, 1);
  }
  resetForm(form?:NgForm){
    if(form!=null){
      form.resetForm();
    }
  }

}
