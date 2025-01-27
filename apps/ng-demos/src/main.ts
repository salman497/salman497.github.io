//import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
//import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();  // Enable production mode if in a production environment

// }

platformBrowserDynamic().bootstrapModule(AppModule)  // Bootstrap the root AppModule
  .catch(err => console.error(err));
