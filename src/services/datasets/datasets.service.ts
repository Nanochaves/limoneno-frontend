import { Observable } from "rxjs";
import { Dataset } from "../../models/dataset";
import { RestService } from "../rest/rest.service";

export default class DatasetService {

  private static instance: DatasetService;
  private datasets: Dataset[] = [];

  public static getInstance(): DatasetService {
    if (!DatasetService.instance) {
      DatasetService.instance = new DatasetService();
    }

    return DatasetService.instance;
  }

  public getDatasets(): Observable<Dataset[]> {
    return new Observable<Dataset[]>(observe => {
      RestService.get('datasets').subscribe(response => {
        this.datasets = response.data.map((dataset: any) => {
          return new Dataset(dataset);
        });
        observe.next(this.datasets);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public getActiveDatasets(): Observable<Dataset[]> {
    return new Observable<Dataset[]>(observe => {
      RestService.get('datasets/active').subscribe(response => {
        this.datasets = response.data.map((dataset: any) => {
          return new Dataset(dataset);
        });
        observe.next(this.datasets);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public getDataset(id: number): Observable<Dataset> {
    return new Observable<Dataset>(observe => {
      RestService.get(`datasets/${id}`).subscribe(response => {
        observe.next(new Dataset(response.data));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public create(dataset: Dataset): Observable<Dataset[]> {
    return new Observable<Dataset[]>(observe => {
      RestService.post('datasets', dataset.toJSON()).subscribe(response => {
        let data = response.data;
        let dataset = new Dataset(data);
        this.datasets.push(dataset);
        observe.next(this.datasets.map(dataset => {
          return new Dataset(dataset);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public update(dataset: Dataset): Observable<Dataset[]> {
    return new Observable<Dataset[]>(observe => {
      RestService.patch('datasets', dataset.toJSON()).subscribe(response => {
        let target = this.datasets.find(item => {
          return item.id === dataset.id;
        });
        
        if (target) {
          this.datasets[this.datasets.indexOf(target)] = dataset;
        }
        
        observe.next(this.datasets.map(dataset => {
          return new Dataset(dataset);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public destroy(dataset: Dataset): Observable<Dataset[]> {
    return new Observable<Dataset[]>(observe => {
      RestService.delete(`datasets/${dataset.id}`).subscribe(response => {
        this.datasets.splice(this.datasets.indexOf(dataset), 1);
        observe.next(this.datasets.map(dataset => {
          return new Dataset(dataset);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }
}