import { Observable } from "rxjs";
import { User } from "../../models/user";
import { RestService } from "../rest/rest.service";

declare var localStorage: any;

export default class UserService {

    private static instance: UserService;
    private user: User | null = null;
    private users: User[] = [];

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public me(): Observable<User> {
        return new Observable<User>(observe => {
            RestService.get('users/me').subscribe(response => {
                this.user = new User(response.data);
                observe.next(this.user);
                observe.complete();
            }, error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public getUser(): User | null {
        return this.user;
    }

    public getUsers(): Observable<User[]> {
        return new Observable<User[]>(observe => {
            if (this.users.length === 0) {
                RestService.get('users').subscribe(response => {
                    this.users = response.data.map((user: any) => {
                        return new User(user);
                    });
                    observe.next(this.users);
                    observe.complete();
                }, error => {
                    observe.error(error);
                    observe.complete();
                });
            } else {
                observe.next(this.users);
                observe.complete();
            }
        });
    }

    public login(email: string, password: string): Observable<User> {
        return new Observable<User>(observe => {
            RestService.post('users/login', {
                email: email,
                password: password
            }).subscribe(response => {
                let data = response.data;
                RestService.setJWT(data.token);
                this.user = new User(data.user);
                observe.next(this.user);
                observe.complete();
            }, error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public create(user: User): Observable<User[]> {
        return new Observable<User[]>(observe => {
            RestService.post('users', user.toJSON()).subscribe(response => {
                let data = response.data;
                let user = new User(data);
                this.users.push(user);
                observe.next(this.users);
                observe.complete();
            }, error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public update(user: User): Observable<User[]> {
        return new Observable<User[]>(observe => {
            RestService.patch('users', user.toJSON()).subscribe(response => {
                let target = this.users.find(item => {
                    return item.id === user.id;
                });
                
                if (target) {
                    this.users[this.users.indexOf(target)] = user;
                }
                
                observe.next(this.users);
                observe.complete();
            }, error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public destroy(user: User): Observable<User[]> {
        return new Observable<User[]>(observe => {
            RestService.delete(`users/${user.id}`).subscribe(response => {
                this.users.splice(this.users.indexOf(user), 1);
                console.log(this.users);
                observe.next(this.users);
                observe.complete();
            }, error => {
                observe.error(error);
                observe.complete();
            });
        });
    }

    public logout(): Observable<boolean> {
        return new Observable<boolean>(observe => {
            RestService.setJWT(null);
            observe.next(true);
        });
    }
}