	import {
	    BrowserModule
	} from '@angular/platform-browser';
	import {
	    NgModule
	} from '@angular/core';
	import {
	    NgxsModule
	} from '@ngxs/store';
	import {
	    NgxsReduxDevtoolsPluginModule
	} from '@ngxs/devtools-plugin';
	import {
	    NgxsLoggerPluginModule
	} from '@ngxs/logger-plugin';
	import {
	    ReactiveFormsModule
	} from '@angular/forms';
	import {
	    Http,
	    Response,
	    HttpModule
	} from '@angular/http';
	import {
	    HttpClientModule,
	    HttpClient,
	    HttpHeaders,
	    HttpHandler
	} from '@angular/common/http';
	import {
	    TaskState
	} from './state/task.state';
	import {
	    TasksService
	} from './tasks.service';
	import {
	    AppComponent
	} from './app.component';
	import {
	    CreateComponent
	} from './components/create/create.component';
	import {
	    IndexComponent
	} from './components/index/index.component';
	import {
	    knownFolders,
	    File,
	    Folder
	} from "file-system";

	@NgModule({
	    declarations: [
	AppComponent,
	CreateComponent,
	IndexComponent
	],
	    imports: [
	BrowserModule,
	HttpModule,
	NgxsModule.forRoot([
	TaskState
	]),
	NgxsReduxDevtoolsPluginModule.forRoot(),
	NgxsLoggerPluginModule.forRoot(),
	ReactiveFormsModule
	],
	    providers: [TasksService],
	    bootstrap: [AppComponent]
	})
	export class AppModule {}
