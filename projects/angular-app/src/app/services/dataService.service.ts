import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private tableData = new BehaviorSubject<any>({});
  public CurrentTableData = this.tableData.asObservable();
  constructor(private httpClient: HttpClient) {}

  getData(url: string): void {
    const endpoint_url = window.location.href + url;
    this.httpClient.get(endpoint_url).subscribe((res: any) => {
      this.tableData.next(res);
    });
  }
}
