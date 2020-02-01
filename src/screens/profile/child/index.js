import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {Container, Left, Body, Right, Button, Icon, Title} from 'native-base';

import Header from '../../../components/header';
import ChildCard from '@Components/profile/childcard';
import Todo from '@Components/todo';
import axios from 'axios';
import {BASE_URL} from '../../../utils/Constants';
import SInfo from 'react-native-sensitive-info';

StatusBar.setBackgroundColor('#0565b8');
StatusBar.setBarStyle('light-content');

export default class UserProfile extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-disc" style={{color: tintColor}} />
    ),
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      check: 0,
      childs: [],
      author_id: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }
  removeChileView = val => {
    alert('remove' + val);
  };

  getData = async () => {
    this.setState({loading: true});
    try {
      const response = await axios.get(`${BASE_URL}wp-json/wp/v2/child`);
      this.setState({loading: false});
      this.setState({
        childs: response.data,
      });
    } catch (error) {
      this.setState({loading: false});
      console.error(error);
    }
  };
  addChild() {
    let child = {
      id: '',
      acf: {
        child_name: '',
        child_gender: '',
        child_school_type: '',
        child_dob: '',
      },
    };
    this.setState({
      childs: [...this.state.childs, child],
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <StatusBar barStyle="light-content" backgroundColor="#0565b8" /> */}
          <Header
            title="Children's Profile"
            clr="#0565b8"
            icon="ios-person"
            route="UserProfile"
            {...this.props}
          />
          {/*<ChildCard />
          {this.state.check === 1 ? <ChildCard /> : null}*/}
          {this.state.childs.map(function(item, index) {
            return (
              <ChildCard
                item={item}
                index={index}
                removeChileView={index => {
                  //console.warn('this.state.childs');
                  alert('This child is deleted.');
                }}
              />
            );
          })}
          <TouchableOpacity
            onPress={() => {
              this.addChild();
            }}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('@Assets/plus.png')}
              style={{height: 30, width: 30, padding: 5}}
            />
            <Text>Add a Child</Text>
          </TouchableOpacity>
        </ScrollView>
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
    // justifyContent: 'center',
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
