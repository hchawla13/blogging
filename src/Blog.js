import React, { Component } from 'react'

export default class Blog extends Component {
    constructor(props) {
        super(props);
        this.state={likesCount:localStorage.getItem('likesCount') || 0}
    }
    incrementLikes= () =>{
        var likesCount = localStorage.getItem('likesCount');
        likesCount++;
        localStorage.setItem('likesCount',likesCount)
        this.setState({likesCount:localStorage.getItem('likesCount')})
    }
    
    render() {
        const givenData = JSON.parse(localStorage.getItem('dataVal'))
        return (
            <div className="blog">
                <h1 className="title">{givenData.title}</h1>
                <img src="../like-icon.png" className="like-img" onClick={this.incrementLikes}></img>
                <div className="author-info">
                    <div className="left">
                        <div>
                            <img src={givenData.authorimage} className="author-image"></img>
                        </div>
                        <div className="author-name">
                            <h4>{givenData.author}</h4>
                            <h4>{givenData.publishdate}</h4>
                        </div>
                    </div>
                    <div className="right">
                        <span className="likes-count">Total Likes :</span>
                        <span className="count">{this.state.likesCount}</span>
                    </div>
                </div>
                <div className="blog-image">
                    <img src={givenData.blogimage}></img>
                </div>
                <div className="category-container">
                    <h2 className="category">{givenData.category}</h2>
                </div>
                <div className="content-container">
                    <h5 className="content">{givenData.content}</h5>
                </div>
            </div>
        )
    }
}
