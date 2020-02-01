import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Input,
  Title,
  List,
  Item,
  CheckBox,
  Label,
  ListItem,
  DatePicker,
} from 'native-base';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import {BASE_URL} from '../../utils/Constants';
// StatusBar.setBackgroundColor('rgb(237,36,42)');
// StatusBar.setBarStyle('light-content');
// StatusBar.setTranslucent(true);

export default class ChildCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: this.props.item,
      index: this.props.index,
      id: this.props.item.id,
      child_name: this.props.item.acf.child_name,
      child_gender: this.props.item.acf.child_gender,
      child_school_type: this.props.item.acf.child_school_type,
      child_dob: this.props.item.acf.child_dob,
      isDeleted: false,
      author_id: '',
      auth_token: '',
    };
  }
  componentDidMount(): void {
    //alert(JSON.stringify(this.props.item));
    SInfo.getItem('author_id', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({author_id: value});
    });
    SInfo.getItem('auth_token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({auth_token: value});
    });
  }
  getDateTime(str) {
    var d = new Date(str);
    if (str != null || str != '') {
      return (
        d.getDate() +
        '/' +
        (d.getMonth() + 1) +
        '/' +
        d.getFullYear() /*+
        ' ' +
        d.getHours() +
        ':' +
        d.getMinutes()*/
      );
    } else {
      return '';
    }
  }
  sendData = () => {
    this.setState({loading: true, isDeleted: false});
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.auth_token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/child/${this.state.id}`,
      data: {
        status: 'publish',
        author: this.state.author_id,
        fields: {
          child_name: this.state.child_name,
          child_gender: this.state.child_gender,
          child_school_type: this.state.child_school_type,
          child_dob: this.state.child_dob,
        },
      },
    })
      .then(response => {
        // alert(JSON.stringify(response));
        this.setState({loading: false, id: response.data.id});
        alert('Child is Added.');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };
  setDate(newDate) {
    if (newDate != null || newDate != '') {
      var mnth = ('0' + (newDate.getMonth() + 1)).slice(-2),
        day = ('0' + newDate.getDate()).slice(-2);
      var dob = [day, mnth, newDate.getFullYear()].join('/');

      return dob;
    } else {
      return '';
    }
  }
  askeTodelete = () => {
    Alert.alert(
      'Delete Child',
      'Do you want to delete this child?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteChild(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  deleteChild = () => {
    this.setState({loading: true, isDeleted: true, id: ''});
    this.props.removeChileView(this.props.index);
    axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.auth_token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/child/${this.state.id}?force=true `,
      data: {
        status: 'publish',
        author: this.state.author_id,
        fields: {
          child_name: this.state.child_name,
          child_gender: this.state.child_gender,
          child_school_type: this.state.child_school_type,
          child_dob: this.state.child_dob,
        },
      },
    })
      .then(response => {
        console.log(response);
        this.props.removeChileView;
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.setState({child_gender: 'girl'})}
            style={[
              styles.imageBox,
              {
                borderColor:
                  this.state.child_gender == 'girl' ? '#0565b8' : 'gray',
              },
            ]}>
            <Image style={styles.image} source={require('@Assets/girl.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({child_gender: 'boy'})}
            style={[
              styles.imageBox,
              {
                borderColor:
                  this.state.child_gender == 'boy' ? '#0565b8' : 'gray',
              },
            ]}>
            <Image style={styles.image} source={require('@Assets/boy.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            placeholder="Child Name"
            style={styles.inputText}
            value={this.state.child_name}
            onChangeText={text => {
              this.setState({
                child_name: text,
              });
            }}
          />
        </View>
        {/* <ListItem> */}
        <View style={styles.row}>
          <CheckBox
            style={styles.CheckBox}
            onPress={() => {
              this.setState({
                child_school_type: 'preschool',
              });
            }}
            // value={this.stat}
            checked={this.state.child_school_type == 'preschool' ? true : false}
          />
          <Text style={{margin: 12}}>PreSchool</Text>

          <CheckBox
            style={styles.CheckBox}
            onPress={() => {
              this.setState({
                child_school_type: 'school',
              });
            }}
            checked={this.state.child_school_type == 'school' ? true : false}
          />
          <Text style={{margin: 12}}>School</Text>
        </View>
        <Item>
          <DatePicker
            style={styles.inputText}
            //defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(1980, 1, 1)}
            maximumDate={new Date()}
            locale={'en'}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={'fade'}
            androidMode={'default'}
            placeHolderText={this.state.child_dob}
            textStyle={{color: 'green'}}
            placeHolderTextStyle={{color: '#d3d3d3'}}
            onDateChange={child_dob => {
              this.setState({
                child_dob: this.setDate(child_dob),
              });
            }}
            disabled={false}
          />
          <Icon name="ios-calendar" />
        </Item>
        {/* </ListItem> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button onPress={() => this.sendData()} style={styles.button}>
            <Body>
              <Text style={styles.buttonLabel}>Save</Text>
            </Body>
          </Button>
          <TouchableOpacity
            onPress={() => {
              this.askeTodelete();
            }}>
            <Text style={{color: this.state.isDeleted ? '#f33333' : '#0565b8'}}>
              {this.state.isDeleted ? 'Deleted' : 'Delete Child'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerColor: {
    backgroundColor: 'rgb(237,36,42)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // marginLeft:'auto',
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    padding: 0,
    borderColor: 'black',
    borderWidth: 0.35,
    borderRadius: 10,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    fontFamily: 'Muli-SemiBold',
  },
  text: {
    textAlign: 'left',
  },
  profileIncomplete: {
    color: 'red',
    padding: 10,
    fontSize: 10,
    fontFamily: 'Muli-Regular',
  },
  image: {
    height: 30,
    width: 30,
    // padding:2?
  },
  imageBox: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    borderRadius: 5,
    margin: 3,
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  CheckBox: {
    borderColor: 'gray',
    borderRadius: 2,
  },
  button: {
    backgroundColor: '#0565b8',
    borderRadius: 15,
    width: 70,
    height: 30,
    justifyContent: 'center',
    margin: 10,
  },
  buttonLabel: {
    fontFamily: 'Muli-SemiBold',
    color: 'white',
  },
});
