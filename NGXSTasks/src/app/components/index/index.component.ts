import {
    Component,
    OnInit
} from '@angular/core';
import {
    Store,
    Select,
    State
} from '@ngxs/store';
import {
    Task
} from '../../models/Task';
import {
    Observable
} from 'rxjs';
import {
    Form,
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';
import {
    HttpModule,
    Http,
    Headers
} from '@angular/http';

import {
    TasksService
} from '../../tasks.service';
import {
    CreateComponent//.angForm as andForm
} from '../../components/create/create.component';
import {
    RemoveTask,
    RemoveTaskCompleted,
    RemoveTaskPending,
    RemoveTaskArchived,
    AddTask,
    AddTaskCompleted,
    AddTaskPending,
    AddTaskArchived,
    FetchPosts
} from '../../actions/task.action';
import {
    TaskState,
    TaskStateModel
} from '../../state/task.state';
import {
    ActivatedRoute
} from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css'],
    providers: [TasksService]
})

export class IndexComponent implements OnInit {

    constructor(private store: Store, private tasksservice: TasksService, private http: Http) {
        this.tasks = this.store.select(state => state.tasks.tasks);
        this.tasksCompleted = this.store.select(state => state.tasks.tasksCompleted);
        this.tasksPending = this.store.select(state => state.tasks.tasksPending);
        this.tasksArchived = this.store.select(state => state.tasks.tasksArchived);
        this.posts = this.store.select(state => state.tasks.posts);
    }
    
    tasksCompleted: Observable < Task > ;
    tasks: Observable < Task > ;
    tasksArchived: Observable < Task > ;
    tasksPending: Observable < Task > ;
    posts: Observable < Task > ;
    flagPending: number = 0;
    
    togllePending(): void {
        this.flagPending ? this.flagPending = 0 : this.flagPending = 1;
    }

    flagArchived: number = 0;
    toglleArchived(): void {
        this.flagArchived ? this.flagArchived = 0 : this.flagArchived = 1;
    }

    flagCompleted: number = 0;
    toglleCompleted(): void {
        this.flagCompleted ? this.flagCompleted = 0 : this.flagCompleted = 1;
    }

    FetchPosts(name, state) {
        this.store.dispatch(new FetchPosts({
            name,
            state
        }))
    }

    addTaskCompleted(name, state) {
        this.store.dispatch(new AddTaskCompleted({
            name,
            state
        }))
        this.store.dispatch(new RemoveTaskPending(name))
        this.store.dispatch(new RemoveTaskArchived(name))
        this.tasksservice
            .makePutRequest({
                name: name,
                state: state
            })
            .subscribe(
                response => {
                    response =   response['_body'];console.log('Answer from server: ', response);
                    error =>console.log( error); 
                }
            );
    }

    addTaskPending(name, state) {
        this.store.dispatch(new AddTaskPending({
            name,
            state
        }))
        this.store.dispatch(new RemoveTask(name))
        this.store.dispatch(new RemoveTaskArchived(name))
        this.tasksservice.savePending(name, state)
    }

    addTaskArchived(name, state) {
        this.store.dispatch(new AddTaskArchived({
            name,
            state
        }))
        this.store.dispatch(new RemoveTask(name))
        this.store.dispatch(new RemoveTaskCompleted(name))
    }
    
    addTask(name, state) {
        this.store.dispatch(new AddTask({
            name,
            state
        }))
    }

    delTask(name) {
        this.store.dispatch(new RemoveTaskArchived(name))
    }
    
    save() {
        this.tasksservice.save(this.store['_stateStream']._value.tasks);
    }
    
    ngOnInit() {    
        //localStorage.clear();
        //localStorage.removeItem('Pending');
        
        console.log('__Pending', localStorage.getItem('Pending'));
        let posts: Task[] = [];
        this.tasksservice.getInitData().subscribe(post => {
            posts = JSON.parse(post['_body']);
            this.FetchPosts(posts[0]['name'], posts[0]['state']);
        })
        
        // if(!(localStorage.getItem('Pending') == undefined))this.store['_stateStream']._value.tasks.tasksPending = JSON.parse(localStorage.getItem('Pending'));

        if (!(localStorage.getItem('story') == undefined)) this.store['_stateStream']._value.tasks = JSON.parse(localStorage.getItem('story'));
    }
    
}
