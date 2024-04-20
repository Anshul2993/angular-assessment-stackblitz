import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DataService } from '../services/dataService.service';

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
  @Input() buttons: button[] = [];
  @Input() selectedTable: any;
  tableData: any;
  constructor(private dataService: DataService) {}

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.dataService.CurrentTableData.subscribe((res: any) => {
      console.log(res);
      this.tableData = res?.response.data;
    });
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
  }
}
