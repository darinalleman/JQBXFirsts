import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from "./search.component";
import {FormsModule} from '@angular/forms';
import { SearchTopResultsComponent } from './search-top-results/search-top-results.component';
import { SearchArtistsComponent } from './search-artists/search-artists.component';
import { SearchAlbumsComponent } from './search-albums/search-albums.component';
import { SearchPlaylistsComponent } from './search-playlists/search-playlists.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchComponent,
    SearchTopResultsComponent,
    SearchArtistsComponent,
    SearchAlbumsComponent,
    SearchPlaylistsComponent
  ]
})
export class SearchModule {
}
