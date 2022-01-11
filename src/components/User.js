import axios from "axios"
import React from 'react'

class User extends React.Component {
    constructor(){
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        axios.get('https://api.github.com/users/xokeixo')
            .then(response => {
                this.setState({
                    ...this.state,
                    user: response.data
                })
            })
            .catch(errors => {
                console.log(errors);
            })
    }

    render(){
        const { user } = this.state;
          if(!this.state.user)
            return (
                <p>Loading Information...</p>
            )
        return (
            <div>
              <h3 className='User-Img'>
                <img width={250} src={this.state.user.avatar_url} alt='User Profile' />
              </h3>
              <div className='User-info'>
                <p>Name: {this.state.user.name} </p>
                <p>Bio: {this.state.user.bio} </p>
                <p>Location: {this.state.user.location} </p>
                <p>Followers: {this.state.user.followers} </p>
                <p>Following: {this.state.user.following} </p>
                <a href={this.state.user.html_url}>
                  <button>Github Profile</button>
                </a>
              </div>
            </div>
        )
    }
}

export default User