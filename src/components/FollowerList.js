import axios from "axios";
import React from 'react'

class FollowerList extends React.Component {
    constructor(){
        super();
        this.state = {
            followersInfo: [],
            followers: [],
            liveFollowers: []
        }
    }

    componentDidMount(){
        axios.get('https://api.github.com/users/xokeixo/followers')
            .then(response => {
                this.setState({
                    ...this.state,
                    followersInfo: response.data,
                    liveFollowers: response.data
                });
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`https://api.github.com/users/xokeixo/${this.state.followers}`)
            .then(resp => {
                this.setState({
                    ...this.state,
                    followersInfo: resp.data,
                    liveFollowers: resp.data
                })
            })
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            followers: e.target.value,
            liveFollowers: this.state.followersInfo.filter(shadow => {
                console.log(shadow);
                return shadow.LF.includes(e.target.value)
            })
        })
    }

    render(){
        const {followers} = this.state;
          if(!this.state.followers) 
            return (
                <p>Loading...</p>
            )
        return (
            <div>
              <div>
                <form >
                    <input value={this.state.followers} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit} >Lookup  Followers</button>
                </form>
              </div>
              <div>
                {
                  this.state.liveFollowers.map(LF => {
                    console.log(LF);
                    return (
                      <div>
                        <div className='followers-Pic'>
                            <img width={250} src={LF.avatar_url} alt='List of Followers Profile' />
                        </div>
                        <div>
                            <h3>Username: {LF.login}</h3>
                            <p>Github Profile: 
                            <a href={LF.html_url}>{LF.html_url}</a>
                            </p>
                        </div>
                      </div>
                    )
                    })
                }  
              </div>
            </div>
        );
    }
}

export default FollowerList