import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from "./home/home.component";
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import { AppConfig} from "./shared/config/app.config";
import { SpotifyService} from "./shared/spotify/angular2-spotify";
import { AuthService} from "./shared/auth/auth.service";
import { AuthHttp } from "./shared/auth/auth.http";
import { AuthGuard } from "./shared/auth/auth.guard";
import { ApiService } from "./shared/api/api.service";
import { SearchComponent } from './search/search.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule} from "@angular/forms";
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainComponent } from './main/main.component';
import { YourMusicComponent } from './your-music/your-music.component';
import { SongsComponent } from './songs/songs.component';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AlbumComponent } from './album/album.component';
import { BrowseComponent } from './browse/browse.component';
import { FeaturedComponent } from './featured/featured.component';
import { GenreMoodsComponent } from './genre-moods/genre-moods.component';
import { NewReleasesComponent } from './new-releases/new-releases.component';
import { CategoryComponent } from './category/category.component';
import { ArtistComponent } from './artist/artist.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MusicPlayerComponent } from './music-player/music-player.component';
import { WebPlayerService } from "./web-player.service";
import { OverviewComponent } from './overview/overview.component';
import { RelatedArtistsComponent } from './related-artists/related-artists.component';
import { ToastrModule } from 'ngx-toastr';
import {StickyModule} from 'ng2-sticky-kit/ng2-sticky-kit';




@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent,
    SearchComponent,
    PlaylistsComponent,
    ProfileComponent,
    SideNavComponent,
    MainComponent,
    YourMusicComponent,
    SongsComponent,
    AlbumsComponent,
    ArtistsComponent,
    PlaylistComponent,
    AlbumComponent,
    BrowseComponent,
    FeaturedComponent,
    GenreMoodsComponent,
    NewReleasesComponent,
    CategoryComponent,
    ArtistComponent,
    MusicPlayerComponent,
    OverviewComponent,
    RelatedArtistsComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule,  CommonModule, StickyModule, ToastrModule.forRoot()
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    // AppConfig,
    // { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
    SpotifyService,
    { provide: 'SpotifyConfig',
      useValue: {
        clientId: '9d7ee30778da43ce8b048be43fb84050',
        redirectUri: 'localhost:4200/callback',
        scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private',
        authToken: localStorage.getItem('angular2-spotify-token')
      },
    },
    ApiService, AuthGuard, AuthHttp, AuthService, AppConfig, WebPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
