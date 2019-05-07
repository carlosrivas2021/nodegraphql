import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Toolbar from '../components/toolbar';
import Dropzone from '../components/dropzone';

const query = gql`
{
    me {
      username
      fullname
      email
    }
  }
  `;

// const userItem = (user, i) => <li key={i}>{user.username}</li>

class Home extends Component {
  render() {
    const { data: { me } } =this.props
    return (
      <Fragment>
        <Toolbar />
        <Dropzone me={me} />

      </Fragment>
    )
  }
}

export default graphql(query)(Home)
