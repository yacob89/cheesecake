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
    this.onUpload = this.onUpload.bind(this);
  }
  componentDidMount() {}
  onChangeFile() {
    const fileButton = document.getElementById(this.id);
    const file = fileButton ? fileButton.files[0] : null;
    if (this.props.onSelect) {
      this.props.onSelect(file);
    }
  }
  onUpload(event) {
    console.log('Hey : ',event);
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
                  <label>First Name</label>
                  <input placeholder="First Name" />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder="Last Name" />
                </Form.Field>
                <Form.Field>
                  <Checkbox label="I agree to the Terms and Conditions" />
                </Form.Field>
                <Button type="submit">Submit</Button>
                <UploadButton label='Upload' onUpload={this.onUpload}></UploadButton>
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

function UploadButton({label, onUpload, id}) {
  let fileInput = null;
  // If no id was specified, generate a random one
  const uid = id || Math.random().toString(36).substring(7);

  return (
    <span>
      <label htmlFor={uid} className="ui icon button">
        <i className="upload icon"></i>
        {label}
      </label>
      <input type="file" id={uid}
        style={{display: "none"}}
        onChange={() => {
          onUpload(fileInput.files[0]);
        }}
        ref={input => {
          fileInput = input;
        }}
      />
    </span>
  );
}

export default Userman;
