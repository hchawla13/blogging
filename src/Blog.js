import React, { Component } from 'react'

export default class Blog extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const givenData = JSON.parse(localStorage.getItem('dataVal'))
        return (
            <div className="blog">
                <div className="id">Id ---> {givenData.id}</div>
                <div className="id">title ---> {givenData.title}</div>
                <div className="id">author ---> {givenData.author}</div>
                <div className="id">category ---> {givenData.category}</div>
                <div className="id">content ---> {givenData.content}</div>
                <div className="id">Publish date ---> {givenData.publishdate}</div>
            </div>
        )
    }
}
