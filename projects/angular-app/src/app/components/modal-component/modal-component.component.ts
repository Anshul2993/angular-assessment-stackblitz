import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService.service';

export interface button {
  text: string;
  color: string;
}
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrl: './modal-component.component.scss',
})
export class ModalComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() selectedTable: any;
  @Input() modalProperties: any;
  searchText: string = '';
  sort: any = { order: 'asc', key: ''};
  tableData: any;
  selectAll: boolean = false;
  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.dataService.CurrentTableData.subscribe((res: any) => {
      console.log(res);
      this.tableData = res?.response?.data;
    });
  }
  getSortedAndFilteredData(column:any=null) {
    const payload = {
      'filter': this.searchText.toLowerCase(),
      'sort': column.sort
    }
    this.dataService.getData(this.selectedTable.dataURL, payload);
  }
  formatKey(key: string) {
    return key.replace(/\s/g, '').toLowerCase();
  }
  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  handleButtonClick(text: string) {
    if (text.toLowerCase() == 'cancel') {
      this.closeModal();
    }
    else {
      this.getSortedAndFilteredData();
    }
  }
  doSort(column:any) {
    console.log(column);
    column.sort.order = column.sort.order == 'asc' ? 'desc' : 'asc';
    this.getSortedAndFilteredData(column);
  }
  checkAll() {
    //const check = this.selectAll;
    this.tableData.forEach((row:any) => {
      row.checked = !this.selectAll
    });
  }
  check() {
    this.selectAll = this.tableData.every((row:any) => {row.checked = true});
  }
}
