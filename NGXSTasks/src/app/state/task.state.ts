import {
    State,
    Action,
    StateContext,
    Selector
} from '@ngxs/store';
import {
    Task
} from '../models/Task';
import {
    AddTask,
    AddTaskCompleted,
    AddTaskPending,
    AddTaskArchived,
    RemoveTask,
    RemoveTaskCompleted,
    RemoveTaskPending,
    RemoveTaskArchived,
    FetchPosts
} from '../actions/task.action';
import {
    TasksService
} from '../tasks.service';
import {
    Observable
} from 'rxjs';
import {
    HttpClient,
    HttpHeaders,
    HttpClientModule
} from '@angular/common/http';

export class TaskStateModel {
    tasks: Task[];
    loading: boolean;
    tasksCompleted: Task[];
    tasksPending: Task[];
    tasksArchived: Task[];
    posts: Task[];
}

@State < TaskStateModel > ({
    name: 'tasks',
    defaults: {
        tasks: [
            {
                name: "Click downtabs, look console and",
                state: "beginning"
	}
	],
        loading: true,
        tasksCompleted: [],
        tasksPending: [],
        tasksArchived: [],
        posts: [
            {
                name: "First StepB",
                state: "beginning"
	}
	]
    }
})

export class TaskState {
    constructor(private tasksservice: TasksService) {}
    @Selector()
    static loading(state: TaskStateModel) {
        return state.loading;
    }

    @Selector()
    static posts(state: TaskStateModel) {
        return state.posts;
    }

    @Action(FetchPosts)
    getPosts({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload
    }: FetchPosts) {
        const state = getState();
        patchState({
            posts: [...state.posts, payload]
        });
    };

    @Selector()
    static getTasks(state: TaskStateModel) {
        return state.tasks;
    }
    
    @Selector()
    static getTasksCompleted(state: TaskStateModel) {
        return state.tasksCompleted;
    }
    
    @Selector()
    static getTasksPending(state: TaskStateModel) {
        return state.tasksPending;
    }
    
    @Selector()
    static getTasksArchived(state: TaskStateModel) {
        return state.tasksArchived;
    }
    
    @Action(AddTask)
    addTask({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload
    }: AddTask) {
        const state = getState();
        patchState({
            tasks: [...state.tasks, payload]
        });
    }
    
    @Action(AddTaskCompleted)
    addTaskCompleted({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload
    }: AddTaskCompleted) {
        const state = getState();
        patchState({
            tasksCompleted: [...state.tasksCompleted, payload]
        });
    }
    
    @Action(AddTaskPending)
    addTaskPending({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload
    }: AddTaskPending) {
        const state = getState();
        patchState({
            tasksPending: [...state.tasksPending, payload]
        });
    }
    
    @Action(AddTaskArchived)
    addTaskArchived({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload
    }: AddTaskArchived) {
        const state = getState();
        patchState({
            tasksArchived: [...state.tasksArchived, payload]
        });
    }
    
    @Action(RemoveTask)
    remove({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload: payload
    }, RemoveTask) { //{ payload }:RemoveTask) 
        patchState({
            tasks: getState().tasks.filter(a => a.name != payload)
        })
    }

    @Action(RemoveTaskCompleted)
    RemoveTaskCompleted({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload: payload
    }, RemoveTaskCompleted) {
        patchState({
			
            tasksCompleted: getState().tasksCompleted.filter(a => a.name != payload)
        });
    }
    
    @Action(RemoveTaskPending)
    RemoveTaskPending({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload: payload
    }, RemoveTaskPending) {
        patchState({
            tasksPending: getState().tasksPending.filter(a => a.name != payload)
        });
    }
    
    @Action(RemoveTaskArchived)
    RemoveTaskArchived({
        getState,
        patchState
    }: StateContext < TaskStateModel > , {
        payload: payload
    }, RemoveTaskArchived) {
        patchState({
            tasksArchived: getState().tasksArchived.filter(a => a.name != payload)
        });
    }
    
}
