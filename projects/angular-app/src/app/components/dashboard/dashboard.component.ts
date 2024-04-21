import { Component } from '@angular/core';
import { URLConstants } from '../../constant';
import { DataService } from '../../services/dataService.service';

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
  modalProperties = {
    header: {
      'backgroundColor': '#f0f0f0',
      'color': '#000'
    },
    content: {
      'color': 'grey'
    },
    footer: {
      'backgroundColor': '#f0f0f0',
      'modalButtons' : [
        { text: 'Cancel', color: 'grey' },
        { text: 'Apply', color: 'deepskyblue' },
      ]
    },
    padding: "10px 20px",
  }
  

  modalTables = [
    {
      id: 1,
      title: 'Table Heading',
      searchEnabled: false,
      width: 600,
      height: 350,
      columns: [
        {title: 'Type', sort: {order: 'asc', key: 'type'}},
        {title: 'Flight', sort: {order: 'asc', key: 'flight'}},
        {title: 'Transaction', sort: {order: 'asc', key: 'transaction'}},
        {title: 'Partner', sort: {order: 'asc', key: 'partner'}},
        {title: 'Activity', sort: {order: 'asc', key: 'activity'}},
        {title: 'Miles', sort: {order: 'asc', key: 'miles'}}
      ],
      checkboxes: true,
      footerButtons: false,
      modalClass: 'table-heading',
      dataURL: URLConstants.TableHeading,
    },
    {
      id: 2,
      title: 'Commodity Table',
      searchEnabled: true,
      width: 400,
      height: 300,
      columns: [
        {title: 'Commodity Code', sort: {order: 'asc', key: 'commoditycode'}},
        {title: 'Commodity Description', sort: {order: 'asc', key: 'commoditydescription'}}
      ],
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
      columns: [
        {title: 'Code', sort: {order: 'asc', key: 'code'}},
        {title: 'Description', sort: {order: 'asc', key: 'description'}}
      ],
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
