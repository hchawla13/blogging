import React, { Component } from 'react'
import data from './blog.json';
import "react-table/react-table.css";  
import ReactTable from "react-table";

export default class Listing extends Component {
    constructor(props) {
        super(props);
        if(!localStorage.getItem('data')){
          localStorage.setItem('data',JSON.stringify(data))
        }
        this.state = {
            data:JSON.parse(localStorage.getItem('data')),
            filtered: JSON.parse(localStorage.getItem('filtered')) || []
        };
    }
    onFilteredChangeCustom = (value, accessor) => {
        let filtered = this.state.filtered;
        let insertNewFilter = 1;
    
        if (filtered.length) {
          filtered.forEach((filter, i) => {
            if (filter["id"] === accessor) {
              if (value === "" || !value.length) filtered.splice(i, 1);
              else filter["value"] = value;
    
              insertNewFilter = 0;
            }
          });
        }
    
        if (insertNewFilter) {
          filtered.push({ id: accessor, value: value });
        }
    
        this.setState({ filtered: filtered });
        localStorage.setItem('filtered',JSON.stringify(filtered))
        var filterItemArray = JSON.parse(localStorage.getItem('filtered'))
      };
    
    render() {
        const { data } = this.state;
        const columns = [
        {  
            Header: 'Title',  
            accessor: 'title',
        },
        {  
            Header: 'Author',  
            accessor: 'author'  
        },
        {  
            Header: 'Category',  
            accessor: 'category',
            
        },
        {  
            Header: 'Publish Date',  
            accessor: 'publishdate',
            
        }]  
        return (
            <div className="listing">
                <ReactTable 
                  data={data}  
                  filterable
                  filtered={this.state.filtered}
                  onFilteredChange={(filtered, column, value) => {
                    this.onFilteredChangeCustom(value, column.id || column.accessor);
                  }}
                  defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id;
                    if (typeof filter.value === "object") {
                      return row[id] !== undefined
                        ? filter.value.indexOf(row[id]) > -1
                        : true;
                    } else {
                      return row[id] !== undefined
                        ? String(row[id]).indexOf(filter.value) > -1
                        : true;
                    }
                  }}
                  defaultPageSize = {4}
                  columns={columns}
                  pageSizeOptions = {[4,8,12]}  
                  getTrProps={(state, rowInfo) => ({
                    onClick: () => {
                        localStorage.setItem('dataVal',JSON.stringify(rowInfo.original))
                        return (
                            this.props.history.push(`/blog/${JSON.stringify(rowInfo.original.id)}`)
                        )
                    }
                  })}
              />  
                
            </div>
        )
    }
}
