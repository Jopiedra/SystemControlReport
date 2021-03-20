
import { Component } from '@angular/core';

@Component({
    selector: 'LoadingPage'
    , template: `
        <div class="container-fluid">
            <div class="loading-screen-wrapper">
                <div class="loading-screen-icon text-center text-white">
                    <h2 class="text-white">Loading...</h2>
                    <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                </div>
            </div>
        </div>
    `
    , providers: [ ]
})

export class LoadingComponent {

}