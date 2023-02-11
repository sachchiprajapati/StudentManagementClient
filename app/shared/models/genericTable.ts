export interface TableBtn {
  styleClass: string;
  icon: string;
  payload: (arg0: any) => string;
  action: string;
  titlename: string;
  colorname: string;
}

export interface TableColumn {
  columnDef: string;
  header: string;
  cell: (arg0: any) => string;
}

export interface ChildTable {
  columnName: string;
  displayName: string;
  isImage: boolean;
  value: string;
}
