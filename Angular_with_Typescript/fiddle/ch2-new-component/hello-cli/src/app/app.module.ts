import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './shared/product.service';

// all elements of a small application can be located in one module (the root module),
// whereas larger apps may have more than one module (feature modules).
// All apps must have at least a root module that’s bootstrapped during app launch.
// From a syntax perspective, an Angular module is a class annotated with the @NgModule() decorator.
@NgModule({
  // declarations list all the components that belong in this module
  // Any component belongs to exactly one module of an app,g
  // and you have to include the name of the component’s class into the declarations property of the @NgModule() decorator 
  declarations: [
    AppComponent,
    ProductComponent // got added after creating a component called Product with CLI command'ng g c product'
  ],
  // these modules are a must for apps that run in browsers
  // all needed modules  go here
  imports: [
    BrowserModule,
    // in SPAs, the entire browser’s page is not being refreshed
    // only a certain portion of the page (view) may be replacing another as the user navigates through your app.
    // Such client-side navigation is arranged with the help of the Angular router.
    AppRoutingModule,

    /* Including some of the Angular modules is a must (for example, @angular/core), whereas some modules are optional
    For example, if you’re planning to use the Angular Forms API and make HTTP requests,
    you should add @angular/forms and @angular/common/http in your package.json   */
    // FormsModule,
    // HttpClientModule,
  ],
  // services go in providers
  // if in the service @Injectable decorator, provideIn: 'root' is used
  // it allows you to skip the step of specifying the service in the providers property of the NgModule() decorator here.
  providers: [ProductService], // got added after creating a service with CLI command 'ng g s shared/product'
  bootstrap: [AppComponent] // declares that AppComponent is the root component
})
export class AppModule { }