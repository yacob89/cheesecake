import React from "react";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Header,
  TextArea,
  Form
} from "semantic-ui-react";
import Amplify, { Storage } from "aws-amplify";
import awsmobile from "../../aws-exports";
//Amplify.configure(awsmobile);
Amplify.configure({
  Auth: {
    identityPoolId: "us-west-2:f0eced49-7c0e-40cc-bc6a-2d4b623f044d", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "us-west-2", // REQUIRED - Amazon Cognito Region
    userPoolId: "us-west-2_keom9fuep", //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: "6kgv5jjo9lcb2d4q8r7g4jag35" //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "mapiduserstorage", //REQUIRED -  Amazon S3 bucket
      region: "us-west-2" //OPTIONAL -  Amazon service region
    }
  }
});

class Uploads extends React.Component {
  constructor(props) {
    super(props);
    // Declare States
    this.state = {
      name: "",
      filename: "",
      file: null,
      textcontent:""
    };
    // Declare Methods
    this.onUpload = this.onUpload.bind(this);
    this.uploadStart = this.uploadStart.bind(this);
    this.getFile = this.getFile.bind(this);
  }
  componentDidMount() {}
  onUpload(event) {
    console.log("Hey : ", event);
    this.setState({
      filename: event.name,
      file: event
    });
  }
  uploadStart() {
    console.log("Starting Upload Progress");
    // Upload File
    // Storage.put(this.state.filename, this.state.file)
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));
    // Upload File to a private bucket
    Storage.put(this.state.filename, this.state.file, {
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
      },
      level: "private",
      contentType: "text/plain"
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  getFile() {
    Storage.get("MyUltimate.txt", { level: "private" })
      .then(result => {
        console.log(result);
        fetch(result)
          .then(r => r.text())
          .then(text => {
            //console.log(text);
            this.setState({
              textcontent: text
            });
          });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="cloud upload" />
          <Header.Content>
            Cloud Upload
            <Header.Subheader>
              Upload your geojson files to mapid cloud
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>File Name</Table.HeaderCell>
              <Table.HeaderCell>Geojson Type</Table.HeaderCell>
              <Table.HeaderCell>View Type</Table.HeaderCell>
              <Table.HeaderCell>Icon</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                <Checkbox slider />
              </Table.Cell>
              <Table.Cell>Bandung.geojson</Table.Cell>
              <Table.Cell>Fill</Table.Cell>
              <Table.Cell>Standard</Table.Cell>
              <Table.Cell>museum-15</Table.Cell>
              <Table.Cell>Edit</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                <Checkbox slider />
              </Table.Cell>
              <Table.Cell>Jakarta.geojson</Table.Cell>
              <Table.Cell>Line</Table.Cell>
              <Table.Cell>Standard</Table.Cell>
              <Table.Cell>museum-15</Table.Cell>
              <Table.Cell>Edit</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell collapsing>
                <Checkbox slider />
              </Table.Cell>
              <Table.Cell>Semarang.geojson</Table.Cell>
              <Table.Cell>Point</Table.Cell>
              <Table.Cell>Standard</Table.Cell>
              <Table.Cell>museum-15</Table.Cell>
              <Table.Cell>Edit</Table.Cell>
              <Table.Cell>Delete</Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="4">
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={this.getFile}
                >
                  <Icon name="user" /> Add Empty Layer
                </Button>
                <UploadButton label="Choose File" onUpload={this.onUpload} />
                <Button size="small" onClick={this.uploadStart}>
                  Upload
                </Button>
                <span>{this.state.filename}</span>
              </Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
        <Form>
          <TextArea value={this.state.textcontent} placeholder="Click to display JSON content" autoHeight />
        </Form>
      </div>
    );
  }
}

function UploadButton({ label, onUpload, id }) {
  let fileInput = null;
  // If no id was specified, generate a random one
  const uid =
    id ||
    Math.random()
      .toString(36)
      .substring(7);

  return (
    <span>
      <label htmlFor={uid} className="ui icon button">
        <i className="upload icon" />
        {label}
      </label>
      <input
        type="file"
        id={uid}
        style={{ display: "none" }}
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

export default Uploads;
