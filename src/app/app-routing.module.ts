import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
import { CombinationOperatorsComponent } from './combination-operators/combination-operators.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
import { UtilityOperatorsComponent } from './utility-operators/utility-operators.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  { path: '', component: ObservableCreationComponent },
  { path: 'observable-creation', component: ObservableCreationComponent },
  { path: 'transformation-operators', component: TransformationOperatorsComponent },
  { path: 'filtering-operators', component: FilteringOperatorsComponent },
  { path: 'combination-operators', component: CombinationOperatorsComponent },
  { path: 'error-handling', component: ErrorHandlingComponent },
  { path: 'utility-operators', component: UtilityOperatorsComponent },
  { path: 'subjects', component: SubjectsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
