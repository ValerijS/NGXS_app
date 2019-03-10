import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response,
    HttpModule,
    Headers
} from '@angular/http';
import {
    Observable
} from 'rxjs';

import {
    Task
} from './models/Task';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(private http: Http) {}

    makePutRequest(bodyObj): Observable <Response> {
        return this.http
            .put(
                'http://vallad.dx.am/angularHttpData.php',
                JSON.stringify(bodyObj)
            )
    }   

    savePending(name, state) {
        let pending: any = localStorage.getItem('Pending');
        pending = pending ? JSON.parse(pending) : JSON.parse(JSON.stringify([{
            'name': name,
            'state': state
        }]));
        pending.push({
            'name': name,
            'state': state
        });
        pending = JSON.stringify(pending);
        localStorage.setItem('Pending', pending);
        console.log('PENDING', localStorage.getItem('Pending'));
    }
    
    save(storingData) {
        storingData = JSON.stringify(storingData);
        console.log('story: ', storingData);

        localStorage.setItem('story', storingData);
    }
    
    getInitData() {
        return this.http.get('assets/initData.json');
    }

}
