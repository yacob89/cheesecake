import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Menu,
  Segment,
  Image,
  Sidebar,
  Icon,
  Header,
  Button
} from "semantic-ui-react";
import "./App.css";
import YacobTheme from "./utils/AmplifyTheme";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { I18n } from "aws-amplify";

// View Components
import Userman from "./views/users/Userman";
import Uploads from "./views/uploads/Uploads";
import Sensors from "./views/sensors/Sensors";

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Link to="/">
      <Menu.Item as="a">
        <Icon name="home" />
        User
      </Menu.Item>
    </Link>
    <Link to="/uploads">
      <Menu.Item as="a">
        <Icon name="gamepad" />
        Uploads
      </Menu.Item>
    </Link>
    <Link to="/sensors">
      <Menu.Item as="a">
        <Icon name="camera" />
        Sensors
      </Menu.Item>
    </Link>
  </Sidebar>
);

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool
};

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

const authScreenLabels = {
  en: {
    "Sign in to your account": "Selamat Datang di mapid FLOW",
    "Forget your password": "Lupa password?",
    Username: "Pengguna",
    "Enter your username": "Masukkan nama pengguna",
    Password: "Kata Sandi",
    "Forget your password? ": "Lupa kata sandi? ",
    "Reset password": "Setel ulang kata sandi",
    "No account? ": "Belum punya akun? ",
    "Create account": "Buat akun",
    "Sign In": "Masuk"
  }
};

I18n.setLanguage("en");
I18n.putVocabularies(authScreenLabels);

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
      activeMenu: "logout",
      files: []
    };
    this.gotoSignIn = this.gotoSignIn.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleHideClick = this.handleHideClick.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.handleSegmentRef = this.handleSegmentRef.bind(this);
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
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
  handleMenuClick(e, { name }) {
    this.setState({ activeMenu: name });
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  handleHideClick() {
    this.setState({ visible: false });
  }
  handleShowClick() {
    this.setState({ visible: true });
  }
  handleSegmentRef(c) {
    this.segmentRef = c;
  }
  handleSidebarHide() {
    this.setState({ visible: false });
  }

  render() {
    const { activeItem } = this.state;
    const { activeMenu } = this.state;
    const { visible } = this.state;
    const { animation, dimmed, direction } = this.state;
    const vertical = direction === "bottom" || direction === "top";
    const imgstyle = {
      height: "53px",
      width: "240px"
    };
    const segmentstyle = {
      marginLeft: "-30px",
      height: "100%"
    };
    const sidebarstyle = {
      backgroundImage:
        "url(https://s3-us-west-2.amazonaws.com/geomapid-assets/img/sidebar.svg)"
    };

    return (
      <div>
        <Router>
          <div>
            <Grid>
              <Grid.Column floated="left" width={8}>
                <Button.Group>
                  <Button disabled={visible} onClick={this.handleShowClick}>
                    Show sidebar
                  </Button>
                  <Button disabled={!visible} onClick={this.handleHideClick}>
                    Hide sidebar
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
                <Button floated="right" basic color="red" onClick={this.handleMenuClick}>
                  Logout
                </Button>
              </Grid.Column>
            </Grid>

            <Sidebar.Pushable as={Segment}>
              {vertical ? null : (
                <VerticalSidebar
                  animation={animation}
                  direction={direction}
                  visible={visible}
                />
              )}
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

              <Sidebar.Pusher dimmed={dimmed && visible}>
                <Segment basic>
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
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </Router>
      </div>
    );
  }
}

//export default App;
// export default withAuthenticator(App, true);
//export default withAuthenticator(App, false, [], null, YacobTheme);
export default withAuthenticator(App, {
  includeGreetings: false,
  theme: YacobTheme
});
