import { Observable } from "rxjs";
import { Project } from "../../models/project";
import { RestService } from "../rest/rest.service";
import UserService from "../users/users.service";

export default class ProjectService {

  private static instance: ProjectService;
  private projects: Project[] = [];

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService();
    }

    return ProjectService.instance;
  }

  public getProjects(): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      RestService.get('projects').subscribe(response => {
        this.projects = response.data.map((project: any) => {
          return new Project(project);
        });
        observe.next(this.projects);
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public getUserProjects(): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      let user = UserService.getInstance().getUser();
      if (user) {
        RestService.get(`users/${user.id}/projects`).subscribe(response => {
          let projects = response.data.map((project: any) => {
            return new Project(project);
          });
          observe.next(projects);
          observe.complete();
        }, error => {
          observe.error(error);
          observe.complete();
        });
      }
    });
  }

  public getProject(id: number): Observable<Project> {
    return new Observable<Project>(observe => {
      RestService.get(`projects/${id}`).subscribe(response => {
        observe.next(new Project(response.data));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public create(project: Project): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      RestService.post('projects', project.toJSON()).subscribe(response => {
        let data = response.data;
        let project = new Project(data);
        this.projects.push(project);
        observe.next(this.projects.map(project => {
          return new Project(project);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public update(project: Project): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      RestService.patch('projects', project.toJSON()).subscribe(response => {
        let target = this.projects.find(item => {
          return item.id === project.id;
        });

        if (target) {
          this.projects[this.projects.indexOf(target)] = project;
        }

        observe.next(this.projects.map(project => {
          return new Project(project);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  public destroy(project: Project): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      RestService.delete(`projects/${project.id}`).subscribe(response => {
        this.projects.splice(this.projects.indexOf(project), 1);
        observe.next(this.projects.map(project => {
          return new Project(project);
        }));
        observe.complete();
      }, error => {
        observe.error(error);
        observe.complete();
      });
    });
  }

  assignPool(id: number, usersPool: {}): Observable<Project[]> {
    return new Observable<Project[]>(observe => {
      const data = {"users_pool": usersPool}
      RestService.post(`projects/${id}/assign_pool`, data).subscribe(response => {
        let target = this.projects.find(item => {
          return item.id === id
        })

        if (target) {
          this.projects[this.projects.indexOf(target)] = response.data;
        }

        observe.next(this.projects.map(project => {
          return new Project(project);
        }))

        observe.complete()
      }, error => {
        observe.error(error)
        observe.complete()
      })
    })
  }
}