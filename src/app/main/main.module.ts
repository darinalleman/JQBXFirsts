import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileModule} from "./profile/profile.module";
import {SearchModule} from "./search/search.module";
import {YourMusicModule} from "./your-music/your-music.module";

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    SearchModule,
    YourMusicModule
  ],
  declarations: []
})
export class MainModule { }
