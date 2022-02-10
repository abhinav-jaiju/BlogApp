import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  
  page : number = 1;
  filter : string;

  constructor( public postService : PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.postService.bindListPosts();
  }

      //Update Employee 
      updatePostById(PostId :number){
        console.log(PostId);
        // navigate to edit form with selected employee details
        this.router.navigate(['post',PostId])
        }
    
        //Delete Emplyee
        deletePost(PostId :number){
        if(confirm('Are you sure, you want to DELETE this record')){
          this.postService.deletePostById(PostId).subscribe(
            response =>{
              this.postService.bindListPosts();
            },
            error=>{
              console.log(error);
            }
          );
        }
         }

         addPost(){
          this.router.navigate(['post'])
         }

}
