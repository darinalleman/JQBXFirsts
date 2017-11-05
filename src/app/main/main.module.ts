import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowseModule} from "./browse/browse.module";
import {ProfileModule} from "./profile/profile.module";
import {SearchModule} from "./search/search.module";
import {YourMusicModule} from "./your-music/your-music.module";

@NgModule({
  imports: [
    CommonModule,
    BrowseModule,
    ProfileModule,
    SearchModule,
    YourMusicModule
  ],
  declarations: []
})
export class MainModule { }
