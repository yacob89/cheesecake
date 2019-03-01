import React from "react";
import {
  Card,
  Icon,
  Image,
  Header,
  Grid,
  Form,
  Button,
  Checkbox,
  Message,
  ButtonProps,
  Label
} from "semantic-ui-react";
import axios from "axios";
import { Auth } from "aws-amplify";
import * as uuid from "uuid";

class Userman extends React.Component {
  constructor(props) {
    super(props);
    // Declare States
    this.state = {
      name: "",
      firstname: "",
      lastname: "",
      address: "",
      postcode: "",
      country: "",
      organization: "",
      image_url: "",
      createdAt: "",
      username: "",
      email: ""
    };
    // Declare Methods
    this.id = uuid.v1();
    this.updateProfile = this.updateProfile.bind(this);
    this.loadUserProfile = this.loadUserProfile.bind(this);
  }
  componentDidMount() {
    Auth.currentSession()
          .then(data => {
            this.setState({
              email: data.idToken.payload.email
            });
          })
          .catch(err => console.log(err));
    this.loadUserProfile();
  }
  loadUserProfile() {
    axios
      .get(
        "https://xlk959w668.execute-api.us-west-2.amazonaws.com/MapidDev/getmapidtable",
        {
          params: {
            username: "mapid"
          }
        }
      )
      .then(response => {
        // handle success
        if (response) {
          console.log(response);
          const userdetails = response.data.Item;
          this.setState({
            firstname: userdetails.firstname,
            lastname: userdetails.lastname,
            address: userdetails.address,
            postcode: userdetails.postcode,
            country: userdetails.country,
            organization: userdetails.organization,
            createdAt: userdetails.createdAt,
            username: userdetails.username,
            image_url: userdetails.image_url
          });
        }
      })
      .catch(function(error) {
        // handle error
        console.log(error);
        //setTimeout(this.loadUserProfile(),3000);
      })
      .then(function() {
        // always executed
        //setTimeout(this.loadUserProfile(),3000);
      });
  }
  updateProfile() {
    console.log('Update Profile');
  }
  render() {
    return (
      <div>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2">
                <Icon name="settings" />
                <Header.Content>
                  Account Settings
                  <Header.Subheader>Manage your preferences</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Image src={this.state.image_url} />
                <Card.Content>
                  <Card.Header>
                    {this.state.firstname + " " + this.state.lastname}
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">Joined {this.state.createdAt}</span>
                  </Card.Meta>
                  <Card.Description>
                    Username: {this.state.username}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    {this.state.email}
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form>
                <Form.Field>
                  <label>Nama Depan</label>
                  <input
                    placeholder="Nama Depan"
                    defaultValue={this.state.firstname}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Nama Belakang</label>
                  <input
                    placeholder="Nama Belakang"
                    defaultValue={this.state.lastname}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Alamat</label>
                  <input
                    placeholder="Alamat"
                    defaultValue={this.state.address}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Kode Pos</label>
                  <input
                    placeholder="Kode Pos"
                    defaultValue={this.state.postcode}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Negara</label>
                  <input
                    placeholder="Negara"
                    defaultValue={this.state.country}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Organisasi</label>
                  <input
                    placeholder="Organisasi"
                    defaultValue={this.state.organization}
                  />
                </Form.Field>
                <Button type="submit" onClick={this.updateProfile}>Update</Button>
                <Message
                  success
                  header="Form Completed"
                  content="You're all signed up for the newsletter"
                />
                <Message
                  error
                  header="Action Forbidden"
                  content="You can only sign up for an account once with a given e-mail address."
                />
              </Form>
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} />
            <Grid.Column width={8} />
            <Grid.Column width={4} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Userman;
