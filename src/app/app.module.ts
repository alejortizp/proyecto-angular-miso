import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectorModule } from './director/director.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';

@NgModule({
  declarations: [		
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DirectorModule,
    MovieModule,
    ActorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
