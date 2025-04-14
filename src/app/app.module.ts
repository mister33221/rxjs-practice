import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObservableCreationComponent } from './observable-creation/observable-creation.component';
import { TransformationOperatorsComponent } from './transformation-operators/transformation-operators.component';
import { FilteringOperatorsComponent } from './filtering-operators/filtering-operators.component';
import { CombinationOperatorsComponent } from './combination-operators/combination-operators.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { UtilityOperatorsComponent } from './utility-operators/utility-operators.component';
import { SubjectsComponent } from './subjects/subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableCreationComponent,
    TransformationOperatorsComponent,
    FilteringOperatorsComponent,
    CombinationOperatorsComponent,
    ErrorHandlingComponent,
    UtilityOperatorsComponent,
    SubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
