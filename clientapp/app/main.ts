// 1. Angular Module File
import { NgModule } from "@angular/core";
// 1. Import all standard modules
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductServiceComponent } from "./app.productservice.component";

// 3. Import all services
import { ProductService } from "./app.products.service";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, ReactiveFormsModule],
  declarations: [ProductServiceComponent],
  providers: [ProductService],
  bootstrap: [ProductServiceComponent]
})
export class AppModule {}
// 4. Making the AppModule as Bootstrap
platformBrowserDynamic().bootstrapModule(AppModule);
