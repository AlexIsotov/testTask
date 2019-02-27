import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CardU from './Card';

let arrUsers=[];
let arrMore=[];
let starCount=[];

const MainHeader = styled.h1(props => ({
  color: props.color,
  display:'flex',
  justifyContent: 'center',
}));

const Button = styled.button`
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: Teal;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-self: center;
  marginTop:7;

`;

class App extends Component {
	constructor(props){
	super(props);
	this.state=({
		arrayUsersMore:[],
		users:[],
		done: false,
		disable:true,
		finishedLoading:false,
		})
}

componentDidMount(){
		let optionsMore={};
		const options = {
		  method: 'GET',
		  headers: { 'content-type': 'application/x-www-form-urlencoded' },
		  url:'https://api.github.com/search/users?o=desc&q=location%3AKyiv&s=followers&type=Users',
		};
		axios(options)
		  .then((response)=>{
			arrUsers=response.data.items;
			this.setState({users:arrUsers}, ()=>{
        let chain = Promise.resolve();
        this.state.users.slice(0,10).forEach((user)=>{
          chain = chain
          .then(()=>{
            optionsMore = {
             method: 'GET',
             headers: { 'content-type': 'application/x-www-form-urlencoded' },
             url: user.url,
             };
             axios(optionsMore)
             .then((res)=>{arrMore.push(res.data)})
             .catch((err)=>{console.log(err)})
           })
          })
// for(let i=0;i<10;i++){
//   optionsMore[i] = {
//   method: 'GET',
//   headers: { 'content-type': 'application/x-www-form-urlencoded' },
//   url: arrUsers[i].url,
//   };
//
// axios(optionsMore[i])
// .then((response)=>{
// arrMore[i]=(response.data);
// })
// .catch(function (error) {
// console.log(error);
// });
// };
				  });
				    this.setState({arrayUsersMore:arrMore}, ()=>{this.setState({finishedLoading: true})});
			   })
		     .catch(function (error) {
			console.log(error);
		  });
};

show =()=>{
this.setState({done:true, disable: false});
};

stars =()=>{
	for(let i=0;i<arrMore.length;i++){
						 starCount[i]=0;
						 let stars = {
						  method: 'GET',
						  headers: { 'content-type': 'application/x-www-form-urlencoded' },
						  url: 'https://api.github.com/users/'+arrMore[i].login+'/starred',
						  };
						    axios(stars)
							.then((response)=>{for(let j=0;j<response.data.length;j++){
								starCount[i]=starCount[i]+parseInt(response.data[j].stargazers_count, 10);
								arrMore[i].stars=starCount[i];
							}
							this.setState({arrayUsersMore: arrMore});
							}
							)
							.catch((err)=>{console.log(err)});
	 }
};
  render() {
    return (
      <div className="App">
    	  <MainHeader color='DarkOliveGreen'>Top 10 GitHub users from Kyiv </MainHeader>
    	  <ButtonBox>
            <Button onClick={this.show} hidden={!this.state.finishedLoading}>Show Users!</Button>
            <Button onClick={this.stars} hidden={this.state.disable}>Show Stars!</Button>
        </ButtonBox>
    		<CardU arrayUsersMore={this.state.arrayUsersMore} show={this.state.done}/>
      </div>
    );
  }
}

export default App;
