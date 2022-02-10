import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post';
import { environment } from 'src/environments/environment';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  post : Post[];
  category : Category[];
  formData : Post = new Post();

  constructor(private httpClient : HttpClient ) { }


  //get all post
  getAllPost():Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/post')
  }

  bindListPosts(){
    this.httpClient.get(environment.apiUrl+'api/post')
    .toPromise().then(
      response =>{
        console.log("From Services");
        console.log(response);
        this.post = response as Post[]
      }
    );
  }
  //category 
  bindListCategory(){
    this.httpClient.get(environment.apiUrl+'api/category')
    .toPromise().then(
      response =>{
        console.log("From Category");
        console.log(response);
        this.category = response as Category[]
      }
    );
  }

  getPostById(id:number): Observable<any>{
    return this.httpClient.get(environment.apiUrl+'api/post/' + id);
  }

  //insert employee
  insertPostById(post : Post): Observable<any>{
    return this.httpClient.post(environment.apiUrl+'api/post',post);
  }
  //update employee
  UpdatePostById(post : Post): Observable<any>{
    return this.httpClient.put(environment.apiUrl+'api/post',post);
  }
  //delete employee
  deletePostById(id:number): Observable<any>{
    return this.httpClient.delete(environment.apiUrl+'api/post/'+ id);
  }
}
