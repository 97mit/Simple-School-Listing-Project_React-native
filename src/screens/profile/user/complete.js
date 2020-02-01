import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Title,
  Label,
  Text,
  DatePicker,
} from 'native-base';

import Header from '../../../components/header';
import {BASE_URL} from '../../../utils/Constants';
import UserCard from '@Components/profile/usercard';
import Todo from '@Components/todo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

// StatusBar.setBackgroundColor('rgb(237,36,42)');
// StatusBar.setBarStyle('light-content');

export default class UserProfile extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      chosenDate: null,
      author_id: '',
      token: '',
      user_name: '',
      user_phone: '',
      user_profession: '',
      user_email: '',
      user_relation: '',
      spouse_name: '',
      spouse_phone: '',
      spouse_profession: '',
      user: [],
      password: '',
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  getData = async author_id => {
    try {
      const response = await axios.get(
        `${BASE_URL}wp-json/wp/v2/users/${author_id}`,
      );
      console.log('response===>' + JSON.stringify(response));
      this.setState({loading: false});
      this.setState({
        chosenDate: response.data.acf.user_date_of_birth,
        user_name: response.data.name,
        user_email: this.state.user_email,
        user_phone: response.data.acf.user_mobile_number,
        user_profession: response.data.acf.user_profession,
        spouse_name: response.data.acf.spouse_name,
        spouse_phone: response.data.acf.spouse_mobile_number,
        spouse_profession: response.data.acf.spouse_profession,
        user_relation: response.data.acf.parents_gender,
      });
      this.getJwtToken();
    } catch (error) {
      this.setState({loading: false});
      console.error(error);
    }
  };
  sendData = () => {
    this.setState({loading: true});
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/users/${
        this.state.author_id
      }?context=edit`,
      data: {
        meta: {
          user_date_of_birth: this.state.chosenDate,
          user_mobile_number: this.state.user_phone,
          user_profession: this.state.user_profession,
          parents_gender: this.state.user_relation,
          spouse_name: this.state.spouse_name,
          spouse_mobile_number: this.state.spouse_phone,
          spouse_age: '75',
          spouse_profession: this.state.spouse_profession,
          user_phone_verified: '0',
        },
      },
    })
      .then(response => {
        console.log(response);
        this.setState({loading: false});
        SInfo.setItem('complete', 'true', {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        }).then(
          value => console.log(value), //value 2
          // this.props.navigation.navigate('App'),
        );
        this.props.navigation.navigate({
          routeName: 'UserProfile',
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: true});
        this.props.navigation.navigate({
          routeName: 'UserProfile',
        });
      });
  };

  componentDidMount() {
    this.setState({loading: true});
    SInfo.getItem('author_id', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      SInfo.getItem('email', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then(email => {
        this.setState({user_email: email, author_id: value});
        this.getData(value);
      });
      //this.setState({author_id: value});
    });
    SInfo.getItem('password', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(pass => {
      this.setState({password: pass});
    });
  }

  getJwtToken = () => {
    axios
      .all([
        axios({
          method: 'post',
          url: `${BASE_URL}wp-json/jwt-auth/v1/token`,
          data: {
            username: this.state.user_email,
            password: this.state.password,
            email: this.state.user_email,
          },
          /*{
                username:
                  this.props.navigation.state.params !== undefined
                    ? this.props.navigation.state.params.email
                    : null,
                password:
                  this.props.navigation.state.params !== undefined
                    ? this.props.navigation.state.params.password
                    : null,
                email:
                  this.props.navigation.state.params !== undefined
                    ? this.props.navigation.state.params.email
                    : null,
              },*/
        }),
        axios.get(
          `${BASE_URL}api/user/generate_auth_cookie/?email=${
            //this.props.navigation.state.params !== undefined
            // ? this.props.navigation.state.params.email
            //: null
            this.state.user_email
          }&password=${
            //this.props.navigation.state.params !== undefined
            //  ? this.props.navigation.state.params.password
            //  : null
            this.state.password
          }`,
        ),
      ])
      .then(response => {
        this.setState({
          token: response[0].data.token,
          user: response[1].data,
        });
        SInfo.setItem('auth_token', response[0].data.token.toString(), {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        }).then(
          value => console.log(value), //value 2
        );
        //this.getData();
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
      });
  };

  render() {
    console.log(this.props.navigation);
    // let data = this.props.navigation.state.params.data;
    return (
      <SafeAreaView>
        <Header
          clr="rgb(237,36,42)"
          title="Complete Your Profile"
          icon="ios-person"
          {...this.props}
          route="UserProfile"
        />
        {this.state.loading && (
          <ActivityIndicator style={styles.loadingStyle} />
        )}
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          {/* <StatusBar /> */}

          <Form
            style={{
              margin: 10,
            }}>
            <Text style={styles.heading}>Your Information</Text>
            <View
              style={{flexDirection: 'row', paddingLeft: 0, paddingRight: 10}}>
              {/* <Item floatingLabel>
              <Label>Name</Label>
              <Input />
              <View style={{padding: 15, paddingBottom: 0}}>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#d3d3d3'}}
                  onDateChange={this.setDate}
                  disabled={false}
                />
                {/* <Text>Date: {this.state.chosenDate.toString().substr(4, 12)}</Text> */}
              {/* </View>
            </Item> */}
              <Item style={{width: wp(60)}}>
                <Input
                  disabled
                  name="Name"
                  placeholder="Name"
                  value={this.state.user_name}
                  onChangeText={text => {
                    this.setState({
                      user_name: text,
                    });
                  }}
                />
              </Item>
              <Item style={{width: wp(20)}}>
                <DatePicker
                  //defaultDate={new Date(this.state.chosenDate)}
                  minimumDate={new Date(1950, 1, 1)}
                  maximumDate={new Date()}
                  locale={'en'}
                  value={this.state.chosenDate}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText={this.state.chosenDate}
                  textStyle={{color: 'green'}}
                  placeHolderTextStyle={{color: '#d3d3d3'}}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Item>
            </View>
            <Item>
              {/* <Label>Email</Label> */}
              <Input
                disabled
                placeholder="Email"
                name="Email"
                keyboardType="email-address"
                value={this.state.user_email}
                onChangeText={text => {
                  this.setState({
                    user_email: text,
                  });
                }}
              />
            </Item>
            <Item>
              {/* <Label>Phone</Label> */}
              <Input
                name="Phone"
                keyboardType="numeric"
                maxLength={10}
                placeholder="Phone"
                value={this.state.user_phone}
                onChangeText={text => {
                  this.setState({
                    user_phone: text,
                  });
                }}
                // placeholder={data.acf.user_mobile_number}
              />
            </Item>
            <Item>
              {/* <Label>Profession</Label> */}
              <Input
                name="Profession"
                placeholder="Profession"
                value={this.state.user_profession}
                onChangeText={text => {
                  this.setState({
                    user_profession: text,
                  });
                }}
                // placeholder={data.acf.user_profession}
              />
            </Item>

            {/* <Item floatingLabel> */}
            <View style={styles.buttonView}>
              <Button
                style={[
                  styles.button1,
                  {
                    backgroundColor:
                      this.state.user_relation == 'Mother'
                        ? 'rgb(255,204,203)'
                        : 'white',
                  },
                ]}
                onPress={() => this.setState({user_relation: 'Mother'})}>
                <Text style={styles.buttonText}>Mother</Text>
              </Button>

              <Button
                onPress={() => this.setState({user_relation: 'Father'})}
                style={[
                  styles.button2,
                  {
                    backgroundColor:
                      this.state.user_relation != 'Mother'
                        ? 'rgb(255,204,203)'
                        : 'white',
                  },
                ]}>
                <Text style={styles.buttonText2}>Father</Text>
              </Button>
            </View>
            {/* </Item> */}
          </Form>
          <Text style={[styles.heading, {marginBottom: 5, marginLeft: 5}]}>
            Spouse Information
          </Text>

          <Form
            style={{
              marginTop: -10,
              marginBottom: -10,
              marginRight: 10,
              marginLeft: 10,
            }}>
            <Item>
              {/* <Label>Name</Label> */}
              <Input
                name="Name"
                placeholder="Name"
                value={this.state.spouse_name}
                onChangeText={text => {
                  this.setState({
                    spouse_name: text,
                  });
                }}
                // placeholder={data.acf.spouse_name}
              />
            </Item>

            <Item>
              {/* <Label>Phone</Label> */}
              <Input
                name="Phone"
                placeholder="Phone"
                keyboardType="numeric"
                maxLength={10}
                value={this.state.spouse_phone}
                onChangeText={text => {
                  this.setState({
                    spouse_phone: text,
                  });
                }}
                //  placeholder={data.acf.spouse_mobile_number}
              />
            </Item>
            <Item>
              {/* <Label>Profession</Label> */}
              <Input
                name="Profession"
                placeholder="Profession"
                value={this.state.spouse_profession}
                onChangeText={text => {
                  this.setState({
                    spouse_profession: text,
                  });
                }}
                // placeholder={data.acf.spouse_profession}
              />
            </Item>
          </Form>
          <View style={styles.LastView}>
            <Button
              onPress={
                () => this.sendData()
                // this.props.navigation.navigate({
                //   routeName: 'UserProfile',
                //   // params: {
                //   //   data: data,
                //   // },
                // })
              }
              style={styles.button}>
              <Body>
                <Text style={styles.buttonLabel}>Save</Text>
              </Body>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerColor: {
    backgroundColor: 'rgb(237,36,42)',
  },
  loadingStyle: {
    position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // marginLeft:'auto',
  },
  container: {
    // flex: 1,
    backgroundColor: 'white',
    // marginTop: 20,
  },
  mainContainer: {
    padding: 0,
    borderColor: 'black',
    borderWidth: 0.35,
    borderRadius: 10,
    margin: 20,
    flexDirection: 'column',
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
  button1: {
    borderRadius: 10,
    margin: 10,
    height: 20,
    backgroundColor: 'rgb(255,204,203)',

    // width: 100,
  },
  button2: {
    borderRadius: 10,
    margin: 10,
    height: 20,
    backgroundColor: 'white',
    // width: 100,
  },
  buttonView: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  buttonText: {
    color: 'gray',
  },
  buttonText2: {
    color: 'gray',
  },
  heading: {
    color: '#0565b8',
    paddingTop: 20,
    paddingLeft: 15,
    fontFamily: 'Muli-SemiBold',
    // fontWeight:
    fontSize: 20,
  },
  button: {
    backgroundColor: '#0565b8',
    borderRadius: 15,
    width: 70,
    height: 30,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
  },
  buttonLabel: {
    fontFamily: 'Muli-SemiBold',
    color: 'white',
  },
  LastView: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
