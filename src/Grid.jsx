import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import PDFExportPanel from "./pdfExport/PDFExportPanel.js";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './index.css'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import DatePickerComponent from './DatePickerComponent';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Tabs from './Tabs.jsx';
import ExportDataImage from './Images/exportdata.png';



var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

const Grid = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
  {
    field: 'athlete',
    minWidth: 200,
    checkboxSelection: checkboxSelection,
    headerCheckboxSelection: headerCheckboxSelection,
    hide: false,
  },
  { field: 'age', hide: false },
  { field: 'country' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
  ]);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: 'Group',
      minWidth: 200,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      wrapText: true,     // <-- HERE
      autoHeight: true,
    };
  }, []);

  const sampleData =  [  {    "athlete": "Michael Phelps",    "age": 23,    "country": "United States",    "year": 2008,    "date": "24/08/2008",    "sport": "Swimming",    "gold": 8,    "silver": 0,    "bronze": 0,    "total": 8  },  {    "athlete": "Michael Phelps",    "age": 19,    "country": "United States",    "year": 2004,    "date": "29/08/2004",    "sport": "Swimming",    "gold": 6,    "silver": 0,    "bronze": 2,    "total": 8  },  {    "athlete": "Dennis Kimetto",    "age": 30,    "country": "Kenya",    "year": 2014,    "date": "28/09/2014",    "sport": "Athletics",    "gold": 1,    "silver": 0,    "bronze": 0,    "total": 1  }]; 

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  const data = sampleData; // slice the sample data to get only 1000 rows
  setRowData(data);
  params.api.paginationSetPageSize(10); // Set the pagination page size to limit the number of rows displayed
}, []);



  const toggleColumn = (field) => {
    const newColumns = columnDefs.map((column) => {
      if(column.field == field){
        const hide = !column.hide;
        console.log("field matched", hide);
        return {...column, hide };
      }
      return column;
    });
    console.log(newColumns);
    setColumnDefs(newColumns);
  }

  const showAllColumns = () => {
   const newColumns = columnDefs.map(column => {
    return {...column, hide: false}
  });
   setColumnDefs(newColumns);
 }

 const hideAllColumns = () => {
   const newColumns = columnDefs.map(column => {
    return {...column, hide: true}
  });
   setColumnDefs(newColumns);
 }

 const downloadCSV = () => {
  gridRef.current.api.exportDataAsCsv();
}

const [startDate, setStartDate] = useState(new Date("2023-04-13"));
const [endDate, setEndDate] = useState(new Date("2023-05-13"));



return (
  <div style={containerStyle} className="container-fluid">
  <div style={{marginTop: "10px"}}>
  <Breadcrumb>
  <Breadcrumb.Item active>Home</Breadcrumb.Item>
  <Breadcrumb.Item active>Admin</Breadcrumb.Item>
  <Breadcrumb.Item active>Patient Responsibility</Breadcrumb.Item>

  <Breadcrumb.Item active>
  Pending Invoices
  </Breadcrumb.Item>

  </Breadcrumb>
  </div>
  <div container style={{display: "flex"}}>
  <span style={{fontWeight: "bold"}}>Pending Invoices</span>
  <div container style={{marginLeft:"100px"}}>
  <Tabs />
  </div>
  </div>
  <div style={{display: "flex"}}>
      <div style={{marginRight: "20px"}}>
        <div>Start date</div>
        <DatePickerComponent/>
      </div>
      <div>
        <div> End date</div>
        <DatePickerComponent/>
      </div>
<div style={{ backgroundColor: "#f8f9fa", marginLeft: "10px", marginTop: "0px", marginBottom: "0px", display: "flex-row", width: "100px", height: "60px"}}>
      <div style={{padding: "10px 5px 0px 5px"}}>Amount Hold</div>
      <div style={{padding: "10px 5px 5px 10px"}}>$1234</div>
  </div>
  </div>
  <div style={{ display: "flex", marginTop: "5px" }}>
  <div style={{ marginRight: "5px" }}>
  </div>
  <div>
  </div>

  </div>






  <div className="grid-check">

  <ColumnsMenu columnDefs={columnDefs} toggleColumn={toggleColumn} showAllColumns={showAllColumns} hideAllColumns={hideAllColumns} />

  </div>
  <div style={gridStyle} className="ag-theme-alpine">
  <AgGridReact
  ref={gridRef}
  rowData={rowData}
  columnDefs={columnDefs}
  autoGroupColumnDef={autoGroupColumnDef}
  defaultColDef={defaultColDef}
  suppressRowClickSelection={true}
          // groupSelectsChildren={true}
  rowSelection={'multiple'}
          // rowGroupPanelShow={'always'}
          // pivotPanelShow={'always'}
  pagination={true}
  onGridReady={onGridReady}
  maxRows={100}
  ></AgGridReact>
  <div className="buttons">
  <OverlayTrigger
  key="export-data-tooltip"
  placement="top"
  overlay={
    <Tooltip id="export-data-tooltip">
    Export Data
    </Tooltip>
  }
  >
  <div>
  <Button variant="light" onClick={downloadCSV}>
  <img src={ExportDataImage}/>
  </Button>
  </div>
  </OverlayTrigger>


  </div>
  </div>
  </div>
  );
};



const ColumnsMenu = ({columnDefs, toggleColumn, showAllColumns, hideAllColumns}) => {
  return (
    <OverlayTrigger trigger="click" placement="left"  overlay={

      <Popover id="popover-positioned-left">
      <Popover.Header as="h3">Columns</Popover.Header>
      <Popover.Body>
      <button onClick={showAllColumns}>Select all</button>
      <button onClick={hideAllColumns}>Hide all</button>
      {columnDefs.map((column) => <div style={{marginRight: 10}}><input type="checkbox" onChange={e => toggleColumn(column.field)} id={column.field} name={column.field} checked={!column.hide} />

        <label for={column.field}>{column.field}</label></div>)}
      </Popover.Body>
      </Popover>}>
      <div>
      <OverlayTrigger placement="top" overlay={
        <Tooltip id="toggle-columns-tooltip">
        Show/Hide columns
        </Tooltip>
      }>
      <Button variant="light">Toggle Columns</Button>
      </OverlayTrigger>
      </div>
      </OverlayTrigger>
      )
};

export default Grid;
