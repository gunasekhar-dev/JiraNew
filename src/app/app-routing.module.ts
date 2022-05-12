import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JiraViewComponent } from './JiraView/jira-view/jira-view.component';
import { ProgressComponent } from './JiraView/jira-view/progressBox/progress/progress.component';

const routes: Routes = [
  {
    path: '',
    component: JiraViewComponent,
  },
  {
    path: 'jira',
    component: JiraViewComponent,
  },
  {
    path: 'progress',
    component: ProgressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
