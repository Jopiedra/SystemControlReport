import { Component } from '@angular/core';

import { Parameters } from '../../../assets/parameters';

@Component({
    selector: 'MainFooter'
    , templateUrl: 'footer.component.html'
    , providers: [ ]
})

export class MainFooterComponent {

    public YearNow: number = new Date().getFullYear();
    public Facebook: string = Parameters.Facebook;
    public Twitter: string = Parameters.Twitter;
    public YouTube: string = Parameters.YouTube;
    public LinkedIn: string = Parameters.LinkedIn; 
    
    constructor( ) { }
}