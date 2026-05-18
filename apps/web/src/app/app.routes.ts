import { Route } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const appRoutes: Route[] = [
  { path: '', component: TaskListComponent },
  { path: '**', redirectTo: '' }
];
