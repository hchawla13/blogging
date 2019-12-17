import React, { Component } from 'react'

export default class Blog extends Component {
    constructor(props) {
        super(props);
        //const givenData = JSON.parse(localStorage.getItem('dataVal'))
        this.state={
            likesCount:localStorage.getItem('likesCount') || 0,
            givenData:JSON.parse(localStorage.getItem('dataVal'))
        }
    }
    incrementLikes= () =>{
        let originalData = JSON.parse(localStorage.getItem('data'))

        let givenData = this.state.givenData;
        givenData.likesCount ++;
        localStorage.setItem('dataVal',JSON.stringify(givenData))
        var foundIndex = originalData.findIndex(x => x.id == givenData.id);
        originalData[foundIndex] = givenData;
        localStorage.setItem('data',JSON.stringify(originalData))
        // do somethign to upadte the original object as weelll.

        this.setState({givenData})
    }
    
    render() {
        
        return (
            <div className="blog">
                <h1 className="title">{this.state.givenData.title}</h1>
                <img src="../like-icon.png" className="like-img" onClick={this.incrementLikes}></img>
                <div className="author-info">
                    <div className="left">
                        <div>
                            <img src={this.state.givenData.authorimage} className="author-image"></img>
                        </div>
                        <div className="author-name">
                            <h4>{this.state.givenData.author}</h4>
                            <h4>{this.state.givenData.publishdate}</h4>
                        </div>
                    </div>
                    <div className="right">
                        <span className="likes-count">Total Likes :</span>
                        <span className="count">{this.state.givenData.likesCount}</span>
                    </div>
                </div>
                <div className="blog-image">
                    <img src={this.state.givenData.blogimage}></img>
                </div>
                <div className="category-container">
                    <h2 className="category">{this.state.givenData.category}</h2>
                </div>
                <div className="content-container">
                    <h5 className="content">{this.state.givenData.content}</h5>
                </div>
            </div>
        )
    }
}
