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
import * as uuid from "uuid";

class Userman extends React.Component {
  constructor(props) {
    super(props);
    // Declare States
    this.state = {
      name: ""
    };
    // Declare Methods
    this.id = uuid.v1();
    this.onChangeFile = this.onChangeFile.bind(this);
  }
  componentDidMount() {}
  onChangeFile() {
    const fileButton = document.getElementById(this.id);
    const file = fileButton ? fileButton.files[0] : null;
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
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
                <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form>
                <Form.Field>
                  <label>Nama Depan</label>
                  <input placeholder="Nama Depan" />
                </Form.Field>
                <Form.Field>
                  <label>Nama Belakang</label>
                  <input placeholder="Nama Belakang" />
                </Form.Field>
                <Form.Field>
                  <label>Alamat</label>
                  <input placeholder="Alamat" />
                </Form.Field>
                <Form.Field>
                  <label>Kode Pos</label>
                  <input placeholder="Kode Pos" />
                </Form.Field>
                <Form.Field>
                  <label>Negara</label>
                  <input placeholder="Negara" />
                </Form.Field>
                <Form.Field>
                  <label>Organisasi</label>
                  <input placeholder="Organisasi" />
                </Form.Field>
                <Button type="submit">Update</Button>
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
