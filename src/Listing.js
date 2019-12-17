import React, { Component } from 'react'
import data from './blog.json';
import BlogItem from './BlogItem'
import "react-table/react-table.css";  
import ReactTable from "react-table";


export default class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:data,
            filtered: [],
            select2: undefined
        };
    }

    onFilteredChangeCustom = (value, accessor) => {
        console.log("filtering data")
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
      };
    
    render() {
        const { data } = this.state;
        const columns = [{  
            Header: 'Title',  
            accessor: 'title',
            
        },
        {  
            Header: 'Author',  
            accessor: 'author'  
        }]  
        console.log("data",data)
        return (
            <div className="listing">
                <ReactTable  
                  data={data}  
                  filterable
                  filtered={this.state.filtered}
                  columns={columns}  
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
                  defaultPageSize = {2}
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]) === filter.value
                  }  
                  pageSizeOptions = {[2,4, 6]}  
              />  
                
            </div>
        )
    }
}
