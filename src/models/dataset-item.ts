export class DatasetItem {
    public id: number;
    public name: string;
    public mime: string;
    public metadata: any;
    public url: string;
    public text: string;
    public status: boolean;
    public dataset: number;

    constructor(item: any = null) {
        this.id = item ? item.id : null;
        this.name = item ? item.name : null;
        this.mime = item ? item.mime : null;
        this.text = item ? item.text : null;
        this.metadata = item ? item.metadata : null;
        this.url = item ? item.url : null;
        this.status = item ? item.status : null;
        this.dataset = item ? item.dataset_id : null;;
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            name: this.name,
            mime: this.mime,
            text: this.text,
            metadata: this.metadata || undefined,
            url: this.url || undefined,
            status: this.status,
            dataset: this.dataset || undefined
        };
    }
}