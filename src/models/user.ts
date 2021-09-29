export class User {
    public id: number;
    public name: string;
    public email: string;
    public password: string | null;
    public admin: boolean;

    constructor(user: any = null) {
        this.id = user ? user.id : null;
        this.name = user ? user.name : null;
        this.email = user ? user.email : null;
        this.password = null;
        this.admin = user ? user.admin : null; 
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            name: this.name,
            email: this.email,
            password: this.password || undefined,
            admin: this.admin
        };
    }
}