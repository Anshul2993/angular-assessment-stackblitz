import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { URLConstants } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private tableData = new BehaviorSubject<any>({});
  public CurrentTableData = this.tableData.asObservable();

  constructor(private httpClient: HttpClient) {}

  getData(url: string, payload: any = null): void {
    const endpoint_url = window.location.href + url;
    this.httpClient.get(endpoint_url).pipe(
      filter<any>((res: any):any => {
        if(payload?.filter) {
          res = this.getFilteredData(res, url, payload.filter);
        } 
        return res;
      }),
      map((res: any) => {
        if(payload?.sort?.key) {
          res = this.sort(payload.sort, res);
        }
        return res;
      })
    ).subscribe((res: any) => {
      this.tableData.next(res);
    });
  }
  private getFilteredData(res: any, url:string, searchtext: string) {
    console.log(res.response.data);
    switch(url){
      case URLConstants.Commodity:
        res.response.data = this.filterdata('commoditydescription', res.response.data, searchtext);
        break;
      case URLConstants.SHC:
        res.response.data = this.filterdata('description', res.response.data, searchtext);
        break;
    }
    return res;
  }
  private filterdata(key:string, data:any, searchText: string){
    return data.filter((x:any) => x[key].toLowerCase().includes(searchText));
  }

  private sort(sort:any, data:any){
    data.response.data.sort((a:any, b:any) => {
      if(sort.order == 'asc'){
        return a[sort.key] < b[sort.key] ? -1 : 1;
      }
      else {
        return a[sort.key] > b[sort.key] ? -1 : 1;
      }
     });
    return data;
  }
  
}
