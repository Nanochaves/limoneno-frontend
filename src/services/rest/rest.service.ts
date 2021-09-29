import axios from 'axios';
import { Observable } from 'rxjs';
import { Config } from '../../config/config';

export class RestService {

    private jwt: string | null = null;
    public static instance: RestService;

    constructor() {
        const jwt = localStorage.getItem('authtoken');
        if (jwt) this.jwt = jwt;
    }

    public static getInstance(): RestService {
        if (!RestService.instance) {
            RestService.instance = new RestService();
        }

        return RestService.instance;
    }

    public static post(uri: string, data: any): Observable<any> {
        return RestService.getInstance().post(uri, data);
    }

    public post(uri: string, data: any): Observable<any> {
        return new Observable<any>(observe => {
            axios.post(`${Config.API}/${uri}`, data, {
                headers: this.getHeaders()
            }).then(data => {
                observe.next(data);
                observe.complete();
            }).catch(error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public static get(uri: string): Observable<any> {
        return RestService.getInstance().get(uri);
    }
    
    public get(uri: string): Observable<any> {
        return new Observable<any>(observe => {
            axios.get(`${Config.API}/${uri}`, {
                headers: this.getHeaders()
            }).then(data => {
                observe.next(data);
                observe.complete();
            }).catch(error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public static put(uri: string, data: any): Observable<any> {
        return RestService.getInstance().put(uri, data);
    }

    public put(uri: string, data: any): Observable<any> {
        return new Observable<any>(observe => {
            axios.put(`${Config.API}/uri`, data, {
                headers: this.getHeaders()
            }).then(data => {
                observe.next(data);
                observe.complete();
            }).catch(error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public static delete(uri: string): Observable<any> {
        return RestService.getInstance().delete(uri);
    }

    public delete(uri: string): Observable<any> {
        return new Observable<any>(observe => {
            axios.delete(`${Config.API}/${uri}`, {
                headers: this.getHeaders()
            }).then(data => {
                observe.next(data);
                observe.complete();
            }).catch(error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public static patch(uri: string, data: any): Observable<any> {
        return RestService.getInstance().patch(uri, data);
    }

    public patch(uri: string, data: any): Observable<any> {
        return new Observable<any>(observe => {
            axios.patch(`${Config.API}/${uri}`, data, {
                headers: this.getHeaders()
            }).then(data => {
                observe.next(data);
                observe.complete();
            }).catch(error => {
                observe.error(error);
                observe.complete();
            });
        });
    }
    
    public static setJWT(jwt: string | null): void {
        RestService.getInstance().setJWT(jwt);
    }

    public setJWT(jwt: string | null): void {
        this.jwt = jwt;

        if (jwt) {
            localStorage.setItem("authtoken", jwt);
        } else {
            localStorage.removeItem('authtoken');
        }
    }

    public getHeaders(): any {
        let headers: any = {
            "Content-Type": "application/json"
        };

        if (this.jwt) {
            headers['Authorization'] = `Bearer ${this.jwt}`;
        }

        return headers;
    }
}