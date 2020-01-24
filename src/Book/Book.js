import React, {Component} from 'react';
import './Book.css';
import BookDetails from '../BookDetails/BookDetails';

class Book extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      more: false, 
      buttonTitle: 'See more'
    }
  }

  handleMore(event) {
    this.setState({ 
      more: !this.state.more, 
      buttonTitle: this.state.buttonTitle === 'See more' ? 'See less' : 'See more', 
     });
  }

  render() {
    
    return (
      <div className="book">
        <div className="container">
          <img src={this.props.imageUrl} alt="" />
          <div className="bookInfo">
            <div className="bookTitle">{this.props.title}</div>
            <div className="bookAuthor"><strong>Author:</strong> {this.props.author}</div>
            <div className="bookPublisher"><strong>Publisher:</strong> {this.props.publisher}</div>
            <div className="bookPublishedDate"><strong>Published date:</strong> {this.props.publishedDate}</div>
            <div className="bookIntro">{this.props.bookIntro}</div>
            <div className="buttonPosition">
              <button className="more" onClick={ e => this.handleMore(e) }> {this.state.buttonTitle} </button>
            </div>
          </div>
        </div>
        { this.state.more && <BookDetails bookDetails={this.props} /> }
          <hr className="line" />
      </div>
    );
  }
}

export default Book;
