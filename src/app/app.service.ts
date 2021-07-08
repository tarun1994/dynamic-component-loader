import { ComponentFactory } from '@angular/core';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { from } from 'rxjs';
import {map} from 'rxjs/operators';


export interface ComponentLoader {
  loadChildren: () => Promise<any>;
}
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private cfr: ComponentFactoryResolver) { }
/*******************************
We are injecting the ComponentFactoryResolver,
which, given a Component, returns a Factory that can be used to create new instances of it. 
The ViewContainerRef is a pointer to an element in which we are going to insert the newly instantiated component.
The ComponentLoader is a simple interface. It holds a loadChildren function that returns a Promise.
This promise, once resolved, returns a Component.

And finally, we are just putting everything together.
Using the from function from rxjs, I'm able to transform the promise into an observable.
Then, I'm mapping this component into a factory, and finally I will inject the component, and return the instance.

*******************************/  
  forChild(vcr: ViewContainerRef, cl: ComponentLoader){
    return from(cl.loadChildren()).pipe(
      map((component: any) => this.cfr.resolveComponentFactory(component)),
      map(componentFactory => vcr.createComponent(componentFactory))
    )
  }
}
