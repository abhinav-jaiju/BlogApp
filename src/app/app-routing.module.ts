import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [

  //Navigate -- Routes
  {path:'category',component:CategoryComponent},
  {path:'post',component:PostComponent},
  {path:'postlist',component:PostListComponent},
  {path:'post/:PostId' , component:PostComponent},
  {path:'postadd', component:PostAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
