import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowseComponent} from "./browse.component";
import {FeaturedComponent} from "./featured/featured.component";
import {GenreMoodsComponent} from "./genre-moods/genre-moods.component";
import {CategoryComponent} from "./genre-moods/category/category.component";
import {NewReleasesComponent} from "./new-releases/new-releases.component";
import {AppRoutingModule} from "../../app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    BrowseComponent,
    FeaturedComponent,
    GenreMoodsComponent,
    CategoryComponent,
    NewReleasesComponent

  ]
})
export class BrowseModule { }
