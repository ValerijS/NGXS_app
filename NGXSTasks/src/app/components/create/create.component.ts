import {
    Component,
    OnInit
} from '@angular/core';
import {
    Store
} from '@ngxs/store';
import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';

import {
    AddTask
} from '../../actions/task.action';
import {
    TaskState
} from '../../state/task.state';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    angForm: FormGroup;
    constructor(private fb: FormBuilder, public store: Store) {
        this.createForm();
    }
    createForm() {
        this.angForm = this.fb.group({
            name: ['', Validators.required],
            state: ['', Validators.required]
        });
    }
    addTask(name, state) {
        this.store.dispatch(new AddTask({
            name,
            state
        })).subscribe(() => this.angForm.reset());
    }
    ngOnInit() {}
}
