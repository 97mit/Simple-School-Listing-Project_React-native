import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Container, Left, Body, Right, Button, Icon, Title} from 'native-base';

import Header from '../../components/header';

// StatusBar.setBackgroundColor('rgb(237,36,42)');
// StatusBar.setBarStyle('light-content');
// StatusBar.setTranslucent(true);

export default class UserCard extends Component {
  sendMessage = link => {
    console.log('senddata clicked');
    this.props.navigation.navigate('CompleteProfile');
    //this.props.parentCallback(link);
  };
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,

      //chosenDate: response.data.acf.user_date_of_birth,
      //user_name: response.data.name,
      //user_email: this.state.user_email,
      //user_phone: response.data.acf.user_mobile_number,
      //user_profession: response.data.acf.user_profession,
      //spouse_name: response.data.acf.spouse_name,
      //spouse_phone: response.data.acf.spouse_mobile_number,
      //spouse_profession: response.data.acf.spouse_profession,
      //user_relation: response.data.acf.parents_gender,
    };
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{this.props.user_name}</Text>
          <Text style={styles.text}>
            {this.props.userData.user_date_of_birth}
          </Text>
          <TouchableOpacity onPress={() => this.sendMessage(true)}>
            {/* <Icon name="ios-brush" style={{color: '#333'}} /> */}
            <Text style={[styles.text, {paddingHorizontal: 10}]}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Text style={[styles.text,{flex:1}]}>{this.props.user_email}</Text>

          <Text style={[styles.text,{flex:0.5}]}>
            {this.props.userData.user_mobile_number}
          </Text>

          <View>
            {/* <Icon name="ios-brush" style={{color: '#333'}} /> */}
            <Text style={styles.text} />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={[styles.text, {flex: 1}]}>
            {this.props.userData.user_profession}
          </Text>
          <Text style={[styles.text, {flex: 0.5}]}>
            {this.props.userData.parents_gender}
          </Text>
          <View />
        </View>
        <Text style={styles.profileIncomplete}>* Profile Incomplete</Text>
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
    flex: 1,
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
