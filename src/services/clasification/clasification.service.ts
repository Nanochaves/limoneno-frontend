import { Observable } from "rxjs";
import { RestService } from "../rest/rest.service";
import { Project } from "../../models/project";
import UserService from "../users/users.service";
import { ProjectDatasetItem } from "../../models/project-dataset-item";

export default class ClasificationService {

  private static instance: ClasificationService;

  public static getInstance(): ClasificationService {
    if (!ClasificationService.instance) {
      ClasificationService.instance = new ClasificationService();
    }

    return ClasificationService.instance;
  }

  public getWorkout(project: Project): Observable<ProjectDatasetItem> {
    return new Observable<ProjectDatasetItem>(observe => {
      let user: any = UserService.getInstance().getUser();
      if (user) {
        RestService.get(`users/${user.id}/projects/${project.id}/workout`).subscribe(response => {
          observe.next(new ProjectDatasetItem(response.data));
          observe.complete();
        }, error => {
          observe.error(error);
          observe.complete();
        });
      } else {
        observe.error("Usuario no localizado");
        observe.complete();
      }
    });
  }

  public updateWorkout(project: Project, workout: ProjectDatasetItem): Observable<ProjectDatasetItem> {
    return new Observable<ProjectDatasetItem>(observe => {
      let user: any = UserService.getInstance().getUser();
      if (user) {
        RestService.patch(`users/${user.id}/projects/${project.id}/workout/${workout.id}`, workout).subscribe(response => {
          observe.next(new ProjectDatasetItem(response.data));
          observe.complete();
        }, error => {
          observe.error(error);
          observe.complete();
        });
      } else {
        observe.error("Usuario no localizado");
        observe.complete();
      }
    });
  }
}