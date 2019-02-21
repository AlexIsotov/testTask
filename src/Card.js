import React, { Component } from 'react';
import styled from 'styled-components';

const Card = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 background: Gainsboro;
 border-style: solid;
 border-width: 2px;
 border-color: DarkSlateGray;
 margin: 3px 2px 3px 2px; 
`;

const CardHeader= styled.div`
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
 margin-left: 5px;
 
`;

const CardFooter= styled.div`
 display: flex;
 flex-direction: row;
 justify-content: flex-start;
	font-size: 12px;
	margin-left:10px;
	margin-top:1px;
`;

const Avatar = styled.img `
	
    display: flex;
    align-self: center;
    margin-left: 1px;
`;

const Link= styled.a `
    color: #0366d6;
    text-decoration: none;
`;
const UserName = styled.span `
	color: SlateGray;
	margin-left: 10px;
	font-weight: bold;
`;
const marginL = {
	marginLeft: 5
}
class CardU extends Component {
	
		
  render() {
    return (
      <div>
				{this.props.show===true && this.props.arrayUsersMore.length>0 ? this.props.arrayUsersMore.slice().map((user)=>{ 
				return ( <div key={user.id}>
				<Card>
					<Avatar src={user.avatar_url} alt="avatar" height={55} width={55}/>
					<div>
					<CardHeader>
						<Link href={user.html_url} target="_blank">{user.login}</Link>
						<UserName>{user.name}</UserName>
					</CardHeader>
					<CardFooter>
						<p ><strong>From:</strong>{user.location}</p>
							{user.bio!==null && <p style={marginL}><em>| {user.bio}</em></p>}
							{user.blog!=='' && <p style={marginL}>| {user.blog}</p>}
							{user.stars && <p style={marginL}>| <strong>Stars</strong> = {user.stars}
												<img src='http://www.clker.com/cliparts/M/I/J/t/i/o/star-md.png' alt='star' height={10} width={10}/>
											</p>}
					</CardFooter>
					</div>
				</Card>
				</div>)
				}) : null}
      </div>
    );
  }
}

export default CardU;
