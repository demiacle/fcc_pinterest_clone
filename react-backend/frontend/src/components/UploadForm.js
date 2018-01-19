import React, { Component } from 'react';
import './UploadForm.css';

class UploadForm extends Component {
  constructor(props){
    super(props)
    this.updateLinkInput = this.updateLinkInput.bind(this)
    this.updateCaptionInput = this.updateCaptionInput.bind(this)
    this.submitLinks = this.submitLinks.bind(this)

    this.state = {linkValue: '', captionValue: ''}
  }
  submitLinks(e) {
    if( this.state.linkValue === '' || this.state.captionValue === '' ){
      return;
    }
    fetch('/createLink', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ link: this.state.linkValue, caption: this.state.captionValue })
    })
      .then(res=>res.json())
      .then(res=>{
        if(res.error){
          alert( res.error )
        } else {
          this.props.addPost( res.post )
        }
      })
      .catch(e=>{ alert('An error occured, please try again')})
  }
  updateLinkInput(e){
    this.setState({ linkValue: e.target.value})
  }
  updateCaptionInput(e){
    this.setState({ captionValue: e.target.value})
  }
  focusInput(e){
    if(e){
      e.focus()
    }
  }
  render() {
    return (
      <form action="javascript:void(0)" id="uploadForm">
        <div>
        <label htmlFor="link">link:</label>
          <input type="text" id="link" value={this.state.linkValue} onChange={this.updateLinkInput} ref={this.focusInput} required/>
          </div>
          <div>
        <label htmlFor="caption">caption:</label>
          <input type="text" id="caption" value={this.state.captionValue} onChange={this.updateCaptionInput} ref={this.focusInput} required/>
        </div>
        <button id="submit" onClick={this.submitLinks}>submit</button>
      </form>
    )
  }
}

export default UploadForm;