import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

export default class MyGatsbyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      result: ''
    };
  }

  _handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(this.state.email) // listFields are optional if you are only capturing the email address.
    .then(data => {
      this.setState({result: data})
      // I recommend setting data to React state
      // but you can do whatever you want (including ignoring this `then()` altogether)
      console.log('DATA', this.state.result)
    })
    .catch(() => {
      // unnecessary because Mailchimp only ever
      // returns a 200 status code
      // see below for how to handle errors
    })
  };

  handleChange = (event) => {
    this.setState({email: event.target.value});
  }

  render () {
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <input type="text" placeholder="Email Address" name="email" onChange={this.handleChange}/>
          <button type="submit">Subscribe</button>
        </form>
        <div>
          <p>
            {this.state.result.result}
          </p>
          <p>
            {this.state.result.msg}
          </p>
        </div>
      </>
    )
  }
}