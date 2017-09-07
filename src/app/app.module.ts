import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CallbackComponent} from './callback/callback.component';
import {HomeComponent} from "./home/home.component";
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF, CommonModule} from "@angular/common";

import {AppConfig} from "./shared/config/app.config";
import {SpotifyService} from "./shared/spotify/angular2-spotify";
import {AuthService} from "./shared/auth/auth.service";
import {AuthHttp} from "./shared/auth/auth.http";
import {AuthGuard} from "./shared/auth/auth.guard";
import {ApiService} from "./shared/api/api.service";
import {SearchComponent} from './main/search/search.component';
import {PlaylistsComponent} from './main/your-music/playlists/playlists.component';
import {ProfileComponent} from './main/profile/profile.component';
import {FormsModule} from "@angular/forms";
import {SideNavComponent} from './main/side-nav/side-nav.component';
import {MainComponent} from './main/main.component';
import {YourMusicComponent} from './main/your-music/your-music.component';
import {SongsComponent} from './main/your-music/songs/songs.component';
import {AlbumsComponent} from './main/your-music/albums/albums.component';
import {ArtistsComponent} from './main/your-music/artists/artists.component';
import {PlaylistComponent} from './main/your-music/playlists/playlist/playlist.component';
import {AlbumComponent} from './main/your-music/albums/album/album.component';
import {BrowseComponent} from './main/browse/browse.component';
import {FeaturedComponent} from './main/browse/featured/featured.component';
import {GenreMoodsComponent} from './main/browse/genre-moods/genre-moods.component';
import {NewReleasesComponent} from './main/browse/new-releases/new-releases.component';
import {CategoryComponent} from './main/browse/genre-moods/category/category.component';
import {ArtistComponent} from './main/your-music/artists/artist/artist.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MusicPlayerComponent} from './main/music-player/music-player.component';
import {OverviewComponent} from './main/your-music/artists/artist/overview/overview.component';
import {RelatedArtistsComponent} from './main/your-music/artists/artist/related-artists/related-artists.component';
import {ToastrModule} from 'ngx-toastr';
import {StickyModule} from 'ng2-sticky-kit/ng2-sticky-kit';
import {ActiveSongService} from './main/music-player/active-song.service';
import {LoadArtistService} from "./main/your-music/artists/artist/load-artist.service";
import { UserComponent } from './main/your-music/playlists/user/user.component';
import {UserService} from "./main/your-music/playlists/user/user.service";


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
    OverviewComponent,
    RelatedArtistsComponent,
    MusicPlayerComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule, CommonModule, StickyModule, ToastrModule.forRoot()
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ActiveSongService,
    SpotifyService,
    LoadArtistService,
    UserService,
    {
      provide: 'SpotifyConfig',
      useValue: {
        clientId: '9d7ee30778da43ce8b048be43fb84050',
        redirectUri: 'localhost:4200/callback',
        scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-private user-modify-playback-state',
        authToken: localStorage.getItem('angular2-spotify-token')
      },
    },
    ApiService, AuthGuard, AuthHttp, AuthService, AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
