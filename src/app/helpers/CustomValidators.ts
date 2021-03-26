import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export class CustomValidators {

    constructor() { }

    static AtleastOneSender(control: AbstractControl) {
        const Direct: Array<number> = control.get('RecipientsDirect')?.value
        const CC: Array<number> = control.get('RecipientsCC')?.value
        const BCC: Array<number> = control.get('RecipientsBCC')?.value

        console.log(Direct);
        console.log(Direct);
        console.log(Direct);
        if(Direct.length == 0 && CC.length == 0 && BCC.length==0){
            control.get('Recipients')?.setErrors({ NoSenders: true});
        }
    }
}