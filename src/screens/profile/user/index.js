import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {Container, Left, Body, Right, Button, Icon, Title} from 'native-base';

import Header from '../../../components/header';
import UserCard from '@Components/profile/usercard';
import Todo from '@Components/todo';
import EditCard from '@Components/profile/edit';
import TodoEdit from '@Components/profile/editTodo';
import SInfo from 'react-native-sensitive-info';
import {ScrollView} from 'react-navigation';
import axios from 'axios';
import {BASE_URL} from '../../../utils/Constants';

StatusBar.setBackgroundColor('rgb(237,36,42)');
StatusBar.setBarStyle('light-content');

export default class UserProfile extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-person" style={{color: tintColor}} />
    ),
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      acf: {},
      user_todolist: [],
      loading: false,
      editProfile: false,
      editTodo: false,
    };
  }

  componentDidMount(): void {
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
  }

  getData = async author_id => {
    this.setState({loading: true});
    try {
      const response = await axios.get(
        `${BASE_URL}wp-json/wp/v2/users/${author_id}`,
      );
      console.log('response===>' + JSON.stringify(response));
      this.setState({loading: false});
      this.setState({
        acf: response.data.acf,
        user_todolist: JSON.parse(
          response.data.acf.user_todolist.replace(/\//g, ''),
        ),
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
    } catch (error) {
      this.setState({loading: false});
      console.error(error);
    }
  };
  logout = () => {
    console.log('Logout called');
    SInfo.deleteItem('isAuth', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log(value); //value1
    });
    SInfo.deleteItem('password', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log(value); //value1
    });
    SInfo.deleteItem('cookie', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log(value); //value1
    });
    SInfo.deleteItem('complete', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log(value); //value1
    });
    SInfo.deleteItem('email', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      console.log(value); //value1
      this.props.navigation.navigate('Auth');
    });
  };

  callbackFunction1 = childData => {
    this.setState({
      editProfile: childData,
    });
  };
  callbackFunction2 = childData => {
    this.setState({
      editTodo: childData,
    });
  };

  render() {
    console.log('PROFILE', this.props);
    return (
      <View style={styles.container}>
        {/* <StatusBar /> */}
        <Header
          title="Profile"
          clr="rgb(237,36,42)"
          icon="ios-person"
          {...this.props}
          route="UserProfile"
        />
        <ScrollView>
          <View style={{flex: 1.5}}>
            {this.state.editProfile ? (
              <EditCard parentCallback={this.callbackFunction1} />
            ) : this.state.editTodo ? (
              <TodoEdit
                author_id={this.state.author_id}
                user_todolist={this.state.user_todolist}
                parentCallback={this.callbackFunction2}
              />
            ) : (
              <View>
                <UserCard
                  navigation={this.props.navigation}
                  userData={this.state.acf}
                  user_name={this.state.user_name}
                  user_email={this.state.user_email}
                  parentCallback={this.callbackFunction1}
                />
                <Todo
                  user_todolist={this.state.user_todolist}
                  parentCallback={this.callbackFunction2}
                />
              </View>
            )}
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 10,
              // bottomTop: 20,
              // position:'relative'
            }}>
            <Text
              style={{fontSize: 12, fontFamily: 'Muli-Light', color: 'gray'}}>
              T&C
            </Text>
            <TouchableOpacity onPress={() => this.logout()}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Muli-Light',
                  color: 'gray',
                  marginLeft: 50,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
            <Text
              style={{fontSize: 12, fontFamily: 'Muli-Light', color: 'gray'}}>
              Privacy Policy
            </Text>
          </View>
          {this.state.loading && (
            <ActivityIndicator
              size={'large'}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.7)',
                position: 'absolute',
                zIndex: 10,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
          )}
        </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // marginLeft:'auto',
  },
  container: {
    flex: 1,
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
});
