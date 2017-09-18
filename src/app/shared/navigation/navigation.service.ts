import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadArtistService } from '../../main/your-music/artists/artist/load-artist.service';
import { UserService } from '../../main/your-music/playlists/user/user.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {
    loggedOut: BehaviorSubject<any> = new BehaviorSubject('');
    loggedIn: BehaviorSubject<any> = new BehaviorSubject('');
    constructor(private router: Router, private loadArtistService: LoadArtistService, private userService: UserService) {
    }

    goToAlbum(album) {
        localStorage.setItem('album', JSON.stringify(album));
        this.router.navigate(['main/album'])
    };

    goToArtist(artist) {
        this.loadArtistService.currentArtist.next(artist);
        this.router.navigate(['main/artist'])

    };

    goToPlaylist(playlist) {
        localStorage.setItem('playlist', JSON.stringify(playlist));
        this.router.navigate(['main/playlist'])
    };

    goToCategory(category) {
        localStorage.setItem('category', JSON.stringify(category));
        this.router.navigate(['main/category'])

    };

    goToUser(id) {
        this.userService.user.next(id);
        this.router.navigate(['main/user']);
    };

    logout() {
        localStorage.clear();
        this.router.navigate(['home']);
    };

}
