import {
    Task
} from '../models/Task';

export class AddTask {
    static readonly type = '[Task] Add';

    constructor(public payload: Task) {}
}

export class AddTaskCompleted {
    static readonly type = '[Task] AddTaskCompleted';

    constructor(public payload: Task) {}
}

export class AddTaskPending {
    static readonly type = '[Task] AddTaskPending';

    constructor(public payload: Task) {}
}

export class AddTaskArchived {
    static readonly type = '[Task] AddTaskArchived';

    constructor(public payload: Task) {}
}

export class RemoveTask {
    static readonly type = '[Task] Remove'

    constructor(public payload: string) {}
}

export class RemoveTaskCompleted {
    static readonly type = '[Task] RemoveTaskCompleted';

    constructor(public payload: Task) {}
}

export class RemoveTaskPending {
    static readonly type = '[Task] RemoveTaskPending';

    constructor(public payload: Task) {}
}

export class RemoveTaskArchived {
    static readonly type = '[Task] RemoveTaskArchived';

    constructor(public payload: Task) {}
}
export class FetchPosts {
    static readonly type = '[Task] FetchPosts';
    
    constructor(public payload: Task) {}
}
