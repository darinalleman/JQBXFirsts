import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {CallbackComponent} from "./callback/callback.component";
import {HttpModule} from "@angular/http";
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {AppConfig} from "./shared/config/app.config";
import {SpotifyService} from "./shared/spotify/angular2-spotify";
import {AuthService} from "./shared/auth/auth.service";
import {AuthHttp} from "./shared/auth/auth.http";
import {AuthGuard} from "./shared/auth/auth.guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SideNavComponent} from "./main/side-nav/side-nav.component";
import {MainComponent} from "./main/main.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActiveSongService} from "./main/music-player/active-song.service";
import {LoadArtistService} from "./main/your-music/artists/artist/load-artist.service";
import {UserService} from "./main/your-music/playlists/user/user.service";
import {UtilitiesService} from "./shared/utilities/utilities.service";
import {NavigationService} from "./shared/navigation/navigation.service";
import {AddToPlaylistModalComponent} from "./shared/modals/add-to-playlist-modal/add-to-playlist-modal.component";
import {AddSongToPlaylistService} from "./shared/modals/add-to-playlist-modal/add-song-to-playlist.service";
import {EditPlaylistModalComponent} from "./shared/modals/edit-playlist-modal/edit-playlist-modal.component";
import {EditPlayListService} from "./shared/modals/edit-playlist-modal/edit-play-list-service";
import {ToastrModule} from "ngx-toastr";
import {HomeModule} from "./home/home.module";
import {MusicPlayerComponent} from "./main/music-player/music-player.component";
import {MainModule} from "./main/main.module";
import {JQBXService} from "./shared/jqbx/jqbx.service";


@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    SideNavComponent,
    MainComponent,
    AddToPlaylistModalComponent,
    EditPlaylistModalComponent,
    MusicPlayerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    HomeModule,
    ReactiveFormsModule,
    CommonModule,
    MainModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      enableHtml: true,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true
    })
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    JQBXService,
    ActiveSongService,
    SpotifyService,
    LoadArtistService,
    UtilitiesService,
    NavigationService,
    UserService,
    AddSongToPlaylistService,
    EditPlayListService,
    {
      provide: 'SpotifyConfig',
      useValue: {
        clientId: '178e1b39ae454cfaa0fc35650922554d',
        redirectUri: 'http://' + window.location.host + '/callback',
        scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative ' +
        'playlist-modify-public playlist-modify-private ' +
        'user-library-read user-library-modify user-read-private user-modify-playback-state',
        authToken: localStorage.getItem('angular2-spotify-token')
      },
    },
     AuthGuard, AuthHttp, AuthService, AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
