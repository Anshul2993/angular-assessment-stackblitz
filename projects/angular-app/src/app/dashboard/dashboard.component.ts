import { Component } from '@angular/core';
import { URLConstants } from '../constant';
import { DataService } from '../services/dataService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  selectedTable = {
    id: 1,
    title: '',
    searchEnabled: false,
    width: 500,
    height: 350,
    columns: [],
    checkboxes: true,
    footerButtons: false,
    modalClass: '',
    dataURL: '',
  };
  modalVisible: boolean = false;

  modalButtons = [
    { text: 'Cancel', color: 'grey' },
    { text: 'Apply', color: 'deepskyblue' },
  ];

  modalTables = [
    {
      id: 1,
      title: 'Table Heading',
      searchEnabled: false,
      width: 500,
      height: 350,
      columns: [
        'Type',
        'Flight',
        'Transaction',
        'Partner',
        'Activity',
        'Miles',
      ],
      checkboxes: true,
      footerButtons: false,
      dataURL: URLConstants.TableHeading,
    },
    {
      id: 2,
      title: 'Commodity Table',
      searchEnabled: true,
      width: 400,
      height: 300,
      columns: ['Commodity Code', 'Commodity Description'],
      checkboxes: true,
      footerButtons: true,
      modalClass: 'commodity-table',
      dataURL: URLConstants.Commodity,
    },
    {
      id: 3,
      title: 'SHC Table',
      searchEnabled: true,
      width: 300,
      height: 300,
      columns: ['Code', 'Description'],
      checkboxes: true,
      footerButtons: true,
      modalClass: 'shc-table',
      dataURL: URLConstants.SHC,
    },
  ];

  constructor(private dataService: DataService) {}

  openModal(table: any) {
    console.log(table);
    this.selectedTable = table;
    this.dataService.getData(this.selectedTable.dataURL);
    this.modalVisible = true;
  }
  closemodal() {
    this.modalVisible = false;
  }
}
