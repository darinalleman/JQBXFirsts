import {Injectable} from '@angular/core';

@Injectable()
export class UtilitiesService {
    constructor() {
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

}
