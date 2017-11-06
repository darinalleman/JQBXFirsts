import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CallbackComponent} from './callback/callback.component';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './main/search/search.component';
import {PlaylistsComponent} from './main/your-music/playlists/playlists.component';
import {ProfileComponent} from './main/profile/profile.component';
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
import {AuthGuard} from './shared/auth/auth.guard';
import {CategoryComponent} from './main/browse/genre-moods/category/category.component';
import {ArtistComponent} from './main/your-music/artists/artist/artist.component';
import {OverviewComponent} from './main/your-music/artists/artist/overview/overview.component';
import {RelatedArtistsComponent} from './main/your-music/artists/artist/related-artists/related-artists.component';
import {UserComponent} from './main/your-music/playlists/user/user.component';
import {MostPlayedComponent} from "./main/your-music/most-played/most-played.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home'}
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'your-music', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard],
        data: { title: 'Search Spotify'}
      },
      {
        path: 'playlist',
        component: PlaylistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'album',
        component: AlbumComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [AuthGuard]

      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'artist',
        component: ArtistComponent,
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          {
            path: 'overview',
            component: OverviewComponent
          },
          {
            path: 'related-artists',
            component: RelatedArtistsComponent
          }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'your-music',
        component: YourMusicComponent,
        children: [
          { path: '', redirectTo: 'playlists', pathMatch: 'full' },
          {
            path: 'playlists',
            component: PlaylistsComponent
          },
          {
            path: 'songs',
            component: SongsComponent
          }
          ,
          {
            path: 'albums',
            component: AlbumsComponent
          },
          {
            path: 'artists',
            component: ArtistsComponent
          },
          {  path: 'most-played',
            component: MostPlayedComponent
          }
        ],
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'browse',
        component: BrowseComponent,
        children: [
          { path: '', redirectTo: 'featured', pathMatch: 'full' },
          {
            path: 'featured',
            component: FeaturedComponent
          },
          {
            path: 'genre-moods',
            component: GenreMoodsComponent
          }
          ,
          {
            path: 'new-releases',
            component: NewReleasesComponent
          }
        ],
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
