import { DatasetItem } from "./dataset-item";

export class Dataset {
    public id: number;
    public name: string;
    public description: string;
    public items: DatasetItem[] = [];
    public items_count: number;

    constructor(dataset: any = null) {
        this.id = dataset ? dataset.id : null;
        this.name = dataset ? dataset.name : null;
        this.description = dataset ? dataset.description : null;
        this.items_count = dataset ? dataset.items_count : null;
        if (dataset && dataset.dataset_items) {
            this.items = dataset.dataset_items.map((set: any) => {
                return new DatasetItem(set);
            });
        }
    }

    public toJSON(): any {
        return {
            id: this.id || undefined,
            name: this.name,
            description: this.description || undefined
        };
    }
}