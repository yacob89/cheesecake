import React, { Component } from "react";
import { Authenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native'
import Userman from './views/users/Userman'

class AppWithAuth extends Component {
  render(){
    return (
      <div>
      <Authenticator>
        <Userman />
      </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;