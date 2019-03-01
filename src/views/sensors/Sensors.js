import React from "react";
import {
  Button,
  Icon,
  Table,
  Header,
  Modal,
  Form,
  Grid,
  Segment,
  Input,
  Message,
  Label
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

class Sensors extends React.Component {
  constructor(props) {
    super(props);
    // Declare States
    this.state = {
      name: "",
      filename: "",
      // Isinya adalah hasil dari query
      sensorlists: [],
      sensorObject: {},
      // Untuk fungsi sort table
      column: null,
      direction: null,
      // Untuk fungsi search
      isLoading: false,
      results: [],
      value: "",
      // Untuk fungsi modal
      modalOpen: false
    };
    // Declare Methods
    this.loadUserSensors = this.loadUserSensors.bind(this);
    this.cellOnClick = this.cellOnClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    this.resetComponent();
  }
  componentDidMount() {
    this.loadUserSensors();
  }
  loadUserSensors() {
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
        const sensorList = response.data.Item.sensor;
        console.log(sensorList);

        var i;
        for (i = 0; i < sensorList.length; i++) {
          rows.push({
            identifier: sensorList[i].identifier,
            sensor_url: sensorList[i].sensor_url,
            last_entry_id: sensorList[i].last_entry_id,
            latitude: sensorList[i].latitude,
            longitude: sensorList[i].longitude,
            sensor_id: sensorList[i].sensor_id,
            createdAt: sensorList[i].createdAt,
            min_value: sensorList[i].min_value,
            max_value: sensorList[i].max_value,
            field1: sensorList[i].field1,
            field2: sensorList[i].field2,
            field3: sensorList[i].field3,
            dynamicValue: sensorList[i].dynamicValue,
            circle_color: sensorList[i].circle_color,
            name: sensorList[i].name,
            interval: sensorList[i].interval,
            _id: sensorList[i]._id,
            inner_color: sensorList[i].inner_color,
            updatedAt: sensorList[i].updatedAt,
            username: sensorList[i].username,
            arrayindex: i
          });
        }
        this.setState({
          sensorlists: rows,
          results: rows
        });
      });
  }
  /* Table Actions*/
  // Action when you click on filename button
  cellOnClick(event) {
    console.log("Click on Cell: ", event.target.id);
    this.setState({
      sensorObject: rows[event.target.id]
    });
    this.handleOpen();
  }
  /* Modal Action */
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });
  // Handle Table Sorting
  handleSort = clickedColumn => () => {
    const { column, results, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        results: _.sortBy(results, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      results: results.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };
  /* Handle Table Search */
  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => this.setState({ value: result.name });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    var source = this.state.sensorlists;
    if (e.target.value) {
      console.log("Ada input");
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(this.state.value), "i");
        const isMatch = result => re.test(result.name);

        this.setState({
          isLoading: false,
          results: _.filter(rows, isMatch)
        });
      }, 300);
    } else {
      console.log("Tidak ada input");
      this.loadUserSensors();
    }
  };
  /* Render JSX Components */
  render() {
    const {
      column,
      sensorlists,
      direction,
      isLoading,
      value,
      results
    } = this.state;
    return (
      <div>
        <Header as="h2">
          <Icon name="microchip" />
          <Header.Content>
            Internet of Things Sensors
            <Header.Subheader>
              Display your IoT devices on the map
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment compact>
          <Input
            id="inputfilename"
            icon="search"
            onChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            placeholder="Search Sensor Name"
          />
        </Segment>

        <Grid>
          <Grid.Column floated="left" width={14}>
            <Table sortable compact celled striped color="blue" key="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={column === "name" ? direction : null}
                    onClick={this.handleSort("name")}
                  >
                    Sensor Name
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "sensor_id" ? direction : null}
                    onClick={this.handleSort("sensor_id")}
                  >
                    Sensor ID
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "dynamicValue" ? direction : null}
                    onClick={this.handleSort("dynamicValue")}
                  >
                    Dynamic Value
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "min_value" ? direction : null}
                    onClick={this.handleSort("min_value")}
                  >
                    Minimal Value
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={column === "max_value" ? direction : null}
                    onClick={this.handleSort("max_value")}
                  >
                    Maximum Value
                  </Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.results.map(i => (
                  <Table.Row>
                    <Table.Cell>
                      <Button
                        basic
                        id={i.arrayindex}
                        color="blue"
                        onClick={this.cellOnClick}
                      >
                        {i.name}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{i.sensor_id}</Table.Cell>
                    <Table.Cell>{i.dynamicValue}</Table.Cell>
                    <Table.Cell>{i.min_value}</Table.Cell>
                    <Table.Cell>{i.max_value}</Table.Cell>
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
                      onClick={this.handleOpen}
                    >
                      <Icon name="user" /> Add Empty Layer
                    </Button>
                    <Button size="small">Upload</Button>
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

        <Modal
          trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size="small"
        >
          <Header icon="browser" content="Sensor Detail" />
          <Modal.Content>
            <Form>
              <Form.Field>
                <Label color="grey">Sensor URL</Label>
                <Input
                  label={{ icon: "asterisk" }}
                  labelPosition="left corner"
                  placeholder="Nama Depan"
                  defaultValue={this.state.sensorObject.sensor_url}
                />
              </Form.Field>
              <Form.Field>
                <Label color="grey">Nama Belakang</Label>
                <input placeholder="Nama Belakang" defaultValue="tes" />
              </Form.Field>
              <Form.Field>
                <Label color="grey">Alamat</Label>
                <input placeholder="Alamat" defaultValue="tes" />
              </Form.Field>
              <Form.Field>
                <Label color="grey">Kode Pos</Label>
                <input placeholder="Kode Pos" defaultValue="tes" />
              </Form.Field>
              <Form.Field>
                <Label color="grey">Negara</Label>
                <input placeholder="Negara" defaultValue="tes" />
              </Form.Field>
              <Form.Field>
                <Label color="grey">Organisasi</Label>
                <input placeholder="Organisasi" defaultValue="tes" />
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
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default Sensors;
