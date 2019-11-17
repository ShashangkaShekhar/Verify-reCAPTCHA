import { Component, OnInit, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './app/home/component.html'
})

export class HomeComponent implements OnInit, AfterViewInit {
    public reactiveForm: FormGroup;
    public title: any;
    public res: any;
    public resmessage: string;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
        private _http: Http) {
    }

    ngOnInit() {
        this.titleService.setTitle("Home");
        this.title = 'Angular8';
        this.reactiveForm = this.formBuilder.group({
            exampleInputEmail1: new FormControl('', Validators.required),
            exampleInputPassword1: new FormControl('', Validators.required),
            recaptchaReactive: new FormControl(null, Validators.required)
        });
    }

    ngAfterViewInit() {}

    onSubmit()
    {
        let _postUrl = 'http://localhost:50760/api/values/Validate';
        this.submitForm(this.reactiveForm.value, _postUrl)
            .subscribe(response => {  
                this.res = response;
                if(this.res.resdata.success)
                {
                    this.resmessage = 'Varified Successfully!'
                    this.reset();
                }
                else
                {
                    this.resmessage = 'Varification Error!'
                }

            }, error => {
                console.log(error);
            });
    }

    //HTTP-POST Request
    submitForm(model: any, postUrl: string): Observable<any> {
        
        return this._http.post(postUrl, model)
            .pipe(map(res => res.json()))
            .pipe(catchError(this.handleError));
    }

    reset()
    {
        this.reactiveForm.setValue({
            exampleInputEmail1: null,
            exampleInputPassword1: null,
            recaptchaReactive: null
        });
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}
