import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { DataService, WinnerDialog } from './data.service';
import {EventsService } from './events.service';
import { TeamsComponent } from './teams/teams.component';
import { TimerComponent } from './timer/timer.component';
import { QuestionsComponent } from './questions/questions.component';
import { CrudComponent } from './crud/crud.component';


@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    TeamsComponent,
    TimerComponent,
    QuestionsComponent,
    CrudComponent,
    WinnerDialog
  ],
  entryComponents:[WinnerDialog],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule
    ,MatGridListModule
    // NgIf
  ],
  providers: [DataService,EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
