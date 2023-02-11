import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChildTable, TableBtn, TableColumn } from '../../models/genericTable';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class GenericTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() buttons: TableBtn[] = [];
  @Input() data: any[] = [];
  @Input() filter: boolean = false;
  @Input() filterPlaceholder: string = 'Filter';
  @Input() footer: string = "";
  @Input() pagination: number[] = [];
  @Input() pageSize !: number;
  @Input() tableMinWidth: number = 500;
  @Input() isCollapse: boolean = false;
  @Output() filteredData = new EventEmitter<any[]>();
  @Output() buttonClick = new EventEmitter<string[]>();
  expandedElement!: any;
  @Input() childTableData: ChildTable[] = [];
  dataSource !: MatTableDataSource<any>;
  displayedColumns !: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (changes.data) {
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.isCollapse) {
          this.displayedColumns = ['expand', ...this.columns.map(c => c.columnDef)];
        }
        else {
          this.displayedColumns = [...this.columns.map(c => c.columnDef)];
        }
        if (this.buttons.length > 0) this.displayedColumns = [...this.displayedColumns, 'actions'];
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredData.emit(this.dataSource.filteredData);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.dataSource.sort = this.sort;
  }

  loadChildComponent(element: any) {
    for (let i = 0; i < this.childTableData.length; i++) {
      var columnname = this.childTableData[i].columnName;
      this.childTableData[i].value = element[columnname]
    }
  }

}
