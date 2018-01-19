import React, { Component } from 'react';
import './UploadForm.css';

class UploadForm extends Component {
  constructor(props){
    super(props)
    this.updateInput = this.updateInput.bind(this)
    this.submitLinks = this.submitLinks.bind(this)

    this.state = {linkValue: '', captionValue: ''}
  }
  componentDidMount(){
  }
  submitLinks(e) {
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
        }
        // TODO redirect here
      })
      .catch(e=>{ alert('An error occured, please try again')})
  }
  updateInput(e){
    this.setState({ value: e.target.value})
  }
  focusInput(e){
    e.focus()
  }
  render() {
    return (
      <form action="javascript:void(0)" id="uploadForm">
        <div>
        <label for="link">link:</label>
          <input type="text" id="link" value={this.state.linkValue} onChange={this.updateInput} ref={this.focusInput} />
          </div>
          <div>
        <label for="caption">caption:</label>
          <input type="text" id="caption" value={this.state.captionValue} onChange={this.updateInput} ref={this.focusInput} />
        </div>
        <button id="submit" onClick={this.submitLinks}>Submit</button>
      </form>
    )
  }
}

export default UploadForm;