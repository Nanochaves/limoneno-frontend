import { Observable } from "rxjs";
import { Dataset } from "../../models/dataset";
import { RestService } from "../rest/rest.service";
import { DatasetItem } from "../../models/dataset-item";
import { Attachment } from "../../models/attachment";

export default class DatasetItemsService {

  private static instance: DatasetItemsService;

  public static getInstance(): DatasetItemsService {
    if (!DatasetItemsService.instance) {
      DatasetItemsService.instance = new DatasetItemsService();
    }

    return DatasetItemsService.instance;
  }

  public getDatasetItems(dataset: Dataset): Observable<DatasetItem[]> {
    return new Observable<DatasetItem[]>(observe => {
      RestService.get(`datasets/${dataset.id}/items`).subscribe(response => {
        let items = response.data.map((dataset: any) => {
          return new DatasetItem(dataset);
        });
        observe.next(items);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public getDatasetItem(dataset: Dataset, id: number): Observable<Dataset> {
    return new Observable<Dataset>(observe => {
      RestService.get(`datasets/${dataset.id}/items/${id}`).subscribe(response => {
        observe.next(new Dataset(response.data));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public create(dataset: Dataset, attachment: Attachment): Observable<DatasetItem> {
    return new Observable<DatasetItem>(observe => {
      RestService.post(`datasets/${dataset.id}/items`, attachment.toJSON()).subscribe(response => {
        let data = response.data;
        let datasetItems = data.map((item: any) => {
          return new DatasetItem(item);
        });
        observe.next(datasetItems);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public update(dataset: Dataset, item: DatasetItem): Observable<DatasetItem> {
    return new Observable<DatasetItem>(observe => {
      RestService.patch(`datasets/${dataset.id}/items/${item.id}`, item.toJSON()).subscribe(response => {
        observe.next(item);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public destroy(dataset: Dataset, item: DatasetItem): Observable<DatasetItem> {
    return new Observable<DatasetItem>(observe => {
      RestService.delete(`datasets/${dataset.id}/items/${item.id}`).subscribe(response => {
        observe.next(item);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }
}