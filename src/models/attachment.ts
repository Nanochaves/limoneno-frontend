export class Attachment {
    public name: string;
    public data: string;
    public metadata: string;
    public url: string;
    public mime: string;

    constructor(attachment: any = null) {
        this.name = attachment ? attachment.name : null;
        this.data = attachment ? attachment.data : null;
        this.metadata = attachment ? attachment.metadata : null;
        this.url = attachment ? attachment.url : null;
        this.mime = attachment ? attachment.mime : null;
    }

    public toJSON(): any {
        return {
            name: this.name,
            data: this.data,
            metadata: this.metadata || undefined,
            url: this.url || undefined,
            mime: this.mime || undefined
        };
    }
}