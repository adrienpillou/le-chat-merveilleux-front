import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { HomeComponent } from './home/home.component';
import { ChatSidenavComponent } from './chat-sidenav/chat-sidenav.component';
import { CalcToolComponent } from './calc-tool/calc-tool.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { WidgetsComponent } from './widgets/widgets.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginFormComponent,
    SigninFormComponent,
    ChatBoxComponent,
    ChatMessageComponent,
    ChatInputComponent,
    HomeComponent,
    ChatSidenavComponent,
    CalcToolComponent,
    SnakeGameComponent,
    WidgetsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
