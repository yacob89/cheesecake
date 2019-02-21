import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import "./App.css";
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Authenticator } from "aws-amplify-react";

// View Components
import Userman from "./views/users/Userman";
import Uploads from "./views/uploads/Uploads";
import Sensors from "./views/sensors/Sensors";

// Amplify Configuration
//Amplify.configure(aws_exports);
Amplify.configure({
  Auth: {
    identityPoolId: "us-west-2:f0eced49-7c0e-40cc-bc6a-2d4b623f044d", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-west-2", // REQUIRED - Amazon Cognito Region
    userPoolId: "us-west-2_keom9fuep", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "6kgv5jjo9lcb2d4q8r7g4jag35" //OPTIONAL - Amazon Cognito Web Client ID
  } /*,
  Storage: {
      AWSS3: {
          bucket: '', //REQUIRED -  Amazon S3 bucket
          region: 'XX-XXXX-X', //OPTIONAL -  Amazon service region
      }
  }*/
});

const federated = {
  google_client_id:
    "595089086135-uobb25oa8ra3j92nlqbm79do9ieaaekc.apps.googleusercontent.com"
};

// Routes
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div />,
    main: () => (
      <div>
        <Userman />
      </div>
    )
  },
  {
    path: "/uploads",
    sidebar: () => <div />,
    main: () => (
      <div>
        <Uploads />
      </div>
    )
  },
  {
    path: "/sensors",
    sidebar: () => <div />,
    main: () => (
      <div>
        <Sensors />
      </div>
    )
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      activeItem: "user",
      files: []
    };
    this.gotoSignIn = this.gotoSignIn.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    var userdata;
    Auth.currentSession()
      //.then(data => console.log(JSON.stringify(data)))
      .then(data => console.log(data.getAccessToken))
      .catch(err => console.log(err));
    //console.log(userdata);
  }

  gotoSignIn() {
    // to switch the authState to 'signIn'
    this.props.onStateChange("signIn", {});
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Router>
          <Grid>
            <Grid.Column width={2}>
              <Menu fluid vertical tabular color="blue">
                <Link to="/">
                  <Menu.Item
                    name="user"
                    active={activeItem === "user"}
                    onClick={this.handleItemClick}
                  />
                </Link>
                <Link to="/uploads">
                  <Menu.Item
                    name="uploads"
                    active={activeItem === "uploads"}
                    onClick={this.handleItemClick}
                  />
                </Link>
                <Link to="/sensors">
                  <Menu.Item
                    name="sensors"
                    active={activeItem === "sensors"}
                    onClick={this.handleItemClick}
                  />
                </Link>
              </Menu>
              {routes.map((route, index) => (
                // You can render a <Route> in as many places
                // as you want in your app. It will render along
                // with any other <Route>s that also match the URL.
                // So, a sidebar or breadcrumbs or anything else
                // that requires you to render multiple things
                // in multiple places at the same URL is nothing
                // more than multiple <Route>s.
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.sidebar}
                />
              ))}
            </Grid.Column>

            <Grid.Column
              textAlign="left"
              stretched
              padded
              floated="left"
              width={14}
            >
              <Segment textAlign="left" compact color="blue">
                {routes.map((route, index) => (
                  // Render more <Route>s with the same paths as
                  // above, but different components this time.
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))}
              </Segment>
            </Grid.Column>
          </Grid>
        </Router>
      </div>
    );
  }
}

//export default App;
export default withAuthenticator(App, true);
