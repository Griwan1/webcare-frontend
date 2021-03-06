import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppUtils } from '../../utils';

export abstract class BaseService<T> {
  private obj: T;

  protected constructor(protected http: HttpClient) {}

  protected abstract getApi(): string;

  public save(obj: T): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveUnauthenticated(obj: T): Observable<any> {
    const req = AppUtils.getUnAuthenticatedRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveAny(obj: any): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveAll(obj: T[]): Observable<any> {
    const req = AppUtils.getRequest(this.getApi());

    return this.http.post(req.url, obj, { headers: req.header });
  }

  public saveWithFile(obj: T): Observable<any> {
    const req = AppUtils.getRequestWithFileSupport(this.getApi());
    return this.http.post(req.url, obj, { headers: req.header });
  }

  public update(id: number, obj: T): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getRequest(api);

    return this.http.put(req.url, obj, { headers: req.header });
  }

  public updateWithFile(id: number, obj: T): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getRequestWithFileSupport(api);

    return this.http.put(req.url, obj, { headers: req.header });
  }

  public detail(id: number): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getRequest(api);

    return this.http.get(req.url, { headers: req.header });
  }

  public delete(id: number): Observable<any> {
    const api = `${this.getApi()}/${id}`;

    const req = AppUtils.getRequest(api);

    return this.http.delete(req.url, { headers: req.header });
  }

  public getById(id: number): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getRequest(api);
    return this.http.get(req.url, { headers: req.header });
  }

  public getByIdUnauthenticated(id: number): Observable<any> {
    const api = `${this.getApi()}/${id}`;
    const req = AppUtils.getUnAuthenticatedRequest(api);
    return this.http.get(req.url, { headers: req.header });
  }

  public getAll(): Observable<any> {
    const api = `${this.getApi()}/all`;
    const req = AppUtils.getRequest(api);
    return this.http.get(req.url, { headers: req.header });
  }

  public getAllUnauthenticated(): Observable<any> {
    const api = `${this.getApi()}/all`;
    const req = AppUtils.getUnAuthenticatedRequest(api);
    return this.http.get(req.url, { headers: req.header });
  }

  public getAllWithSearchObject(searchObj: any): Observable<any> {
    const api = `${this.getApi()}/list/all`;
    const req = AppUtils.getRequest(api);

    return this.http.post(req.url, searchObj, { headers: req.header });
  }

  public getAllWithSearchObjectUnauthenticated(
    searchObj: any
  ): Observable<any> {
    const api = `${this.getApi()}/list/all`;
    const req = AppUtils.getUnAuthenticatedRequest(api);

    return this.http.post(req.url, searchObj, { headers: req.header });
  }

  public getPaginationWithSearch(
    search: string,
    page: number = 1,
    size: number = 20
  ): Observable<any> {
    let api: string;

    if (search === null || search === undefined) {
      api = `${this.getApi()}?page=${page}&size=${size}`;
    } else {
      api = `${this.getApi()}?page=${page}&&size=${size}&${search}`;
    }

    const req = AppUtils.getRequest(api);

    return this.http.get(req.url, { headers: req.header });
  }

  public getPaginationWithSearchObject(
    searchObj: any,
    page: number = 1,
    size: number = 10
  ): Observable<any> {
    const api = `${this.getApi()}/list?page=${page}&size=${size}`;
    const req = AppUtils.getRequest(api);

    return this.http.post(req.url, searchObj, { headers: req.header });
  }

  public getOneWithSearchObject(searchObj: any): Observable<any> {
    const api = `${this.getApi()}/one`;
    const req = AppUtils.getRequest(api);

    return this.http.post(req.url, searchObj, { headers: req.header });
  }

  public set(obj: T): void {
    this.obj = obj;
  }

  public get(): T {
    return this.obj;
  }

  public clear(): void {
    this.obj = undefined;
  }
}
