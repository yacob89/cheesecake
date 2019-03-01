import React from "react";
import {
  Button,
  Icon,
  Table,
  Header,
  TextArea,
  Form,
  Grid,
  Search,
  Segment,
  Input
} from "semantic-ui-react";
import Amplify, { Storage } from "aws-amplify";
import axios from "axios";
import { Auth } from "aws-amplify";
import _ from "lodash";
import * as uuid from "uuid";
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
let rows = [];

class Uploads extends React.Component {
  constructor(props) {
    super(props);
    // Declare States
    this.state = {
      name: "",
      filename: "",
      file: null,
      textcontent: "",
      // Isinya adalah hasil dari query
      layerlists: [],
      // Untuk fungsi sort table
      column: null,
      direction: null,
      // Untuk fungsi search
      isLoading: false,
      results: [],
      value: ""
    };
    // Declare Methods
    this.onUpload = this.onUpload.bind(this);
    this.uploadStart = this.uploadStart.bind(this);
    this.getFile = this.getFile.bind(this);
    this.loadUserLayers = this.loadUserLayers.bind(this);
    this.cellOnClick = this.cellOnClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentWillMount() {
    this.resetComponent();
  }
  componentDidMount() {
    this.loadUserLayers();
  }
  loadUserLayers() {
    // Make a request for a user with a given ID
    rows = [];

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
        console.log(response);
        const fileList = response.data.Item.fileuploads;
        console.log(fileList);

        var i;
        for (i = 0; i < fileList.length; i++) {
          rows.push({
            active: fileList[i].active,
            circle_color: fileList[i].circle_color,
            color: fileList[i].color,
            createdAt: fileList[i].createdAt,
            display_type: fileList[i].display_type,
            dynamicval: fileList[i].dynamicval,
            filename: fileList[i].filename,
            filesize: fileList[i].filesize,
            icon: fileList[i].icon,
            inner_color: fileList[i].inner_color,
            interval: fileList[i].interval,
            max_value: fileList[i].max_value,
            min_value: fileList[i].min_value,
            sensorid: fileList[i].sensorid,
            server_url: fileList[i].server_url,
            type: fileList[i].type,
            updatedAt: fileList[i].updatedAt,
            username: fileList[i].username,
            _id: fileList[i]._id,
            arrayindex: i
          });
        }
        this.setState({
          layerlists: rows
        });
      });
  }
  onUpload(event) {
    console.log("Hey : ", event);
    this.setState({
      filename: event.name,
      file: event
    });
  }
  uploadStart() {
    var gabungan = {
      data: {
        label: "",
        value: ""
      },
      options: {
        label: "",
        value: ""
      }
    };
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
  /* Table Actions*/
  // Action when you click on filename button
  cellOnClick(event) {
    console.log("Click on Cell: ", event.target.id);
  }
  // Handle Table Sorting
  handleSort = clickedColumn => () => {
    const { column, layerlists, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        layerlists: _.sortBy(layerlists, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      layerlists: layerlists.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };
  /* Handle Table Search */
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.filename });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    var source = this.state.layerlists;

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.filename);

      this.setState({
        isLoading: false,
        results: _.filter(rows, isMatch)
      });
    }, 300);
  };
  /* Render JSX Components */
  render() {
    const {
      column,
      layerlists,
      direction,
      isLoading,
      value,
      results
    } = this.state;
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
        <Input icon="search" onChange={
          _.debounce(this.handleSearchChange, 500, {
            leading: true
          })
        } placeholder="Search..." />

        <Segment>
          <Header>State</Header>
          <pre style={{ overflowX: "auto" }}>
            {JSON.stringify(this.state.results, null, 2)}
          </pre>
        </Segment>

        <Grid>
          <Grid.Column floated="left" width={14}>
            <Table sortable compact celled striped color="blue" key="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === "filename" ? direction : null}
                    onClick={this.handleSort("filename")}
                  >
                    File Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "type" ? direction : null}
                    onClick={this.handleSort("type")}
                  >
                    Geojson Type
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "display_type" ? direction : null}
                    onClick={this.handleSort("display_type")}
                  >
                    View Type
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "icon" ? direction : null}
                    onClick={this.handleSort("icon")}
                  >
                    Icon
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "active" ? direction : null}
                    onClick={this.handleSort("active")}
                  >
                    Visibility
                  </Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.layerlists.map(i => (
                  <Table.Row>
                    <Table.Cell>
                      <Button
                        basic
                        id={i.arrayindex}
                        color="blue"
                        onClick={this.cellOnClick}
                      >
                        {i.filename}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{i.type}</Table.Cell>
                    <Table.Cell>{i.display_type}</Table.Cell>
                    <Table.Cell>{i.icon}</Table.Cell>
                    <Table.Cell>
                      <Button basic id={i.arrayindex} color="teal">
                        {i.active}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button basic id={i.arrayindex} color="green">
                        Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button id={i.arrayindex} color="red">
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
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
                    <UploadButton
                      label="Choose File"
                      onUpload={this.onUpload}
                    />
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
          </Grid.Column>
          <Grid.Column floated="left" width={2} />
        </Grid>
        <Form>
          <TextArea
            value={this.state.textcontent}
            placeholder="Click to display JSON content"
            autoHeight
          />
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
