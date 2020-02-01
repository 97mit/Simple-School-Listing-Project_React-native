import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  Body,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Label,
  Text,
  DatePicker,
} from 'native-base';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Edit extends Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-person" style={{color: tintColor}} />
    ),
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: null,
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }
  sendMessage = link => {
    console.log('senddata clicked');
    this.props.parentCallback(link);
  };
  render() {
    // console.log(this.props);
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
        <Form
          style={{
            marginTop: -10,
            marginBottom: -10,
            marginRight: 10,
            marginLeft: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>Profile</Text>
            <TouchableOpacity onPress={() => this.sendMessage(false)}>
              <Image
                source={require('@Assets/close.png')}
                style={{height: 13}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            {/* <Icon onPress={() => this.sendMessage(false)} name="logo-nodejs" /> */}
          </View>
          <View
            style={{flexDirection: 'row', paddingLeft: 0, paddingRight: 10}}>
            <Item style={{width: wp(57)}}>
              <Input placeholder="Name" />
            </Item>
            <Item style={{width: wp(20)}}>
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                placeHolderText="D.O.B"
                textStyle={{color: 'green'}}
                placeHolderTextStyle={{color: '#d3d3d3'}}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
          </View>
          <Item>
            <Input placeholder="Email" />
          </Item>
          <Item>
            <Input placeholder="Phone" />
          </Item>
          <Item>
            <Input placeholder="Profession" />
          </Item>
          <View style={styles.buttonView}>
            <Button style={styles.button1}>
              <Text style={styles.buttonText}>Mother</Text>
            </Button>

            <Button style={styles.button2}>
              <Text style={styles.buttonText2}>Father</Text>
            </Button>
          </View>
        </Form>
        <Text style={styles.headingBottom}>Spouse Information</Text>
        <Form
          style={{
            marginTop: -10,
            marginBottom: -10,
            marginRight: 10,
            marginLeft: 10,
          }}>
          <Item>
            <Input placeholder="Name" />
          </Item>

          <Item>
            <Input placeholder="Phone" />
          </Item>
          <Item>
            <Input placeholder="Profession" />
          </Item>
        </Form>
        <View style={styles.LastView}>
          <Button onPress={() => this.sendMessage(false)} style={styles.button}>
            <Body>
              <Text style={styles.buttonLabel}>Save</Text>
            </Body>
          </Button>
        </View>
      </ScrollView>
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
    marginTop: 20,
    elevation: 3,
    // borderColor: 'black',
    borderWidth: 0.35,
    borderRadius: 10,
    margin: 20,
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
    color: 'white',
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
  headingBottom: {
    color: '#0565b8',
    paddingTop: 20,
    paddingLeft: 20,
    fontFamily: 'Muli-SemiBold',
    // fontWeight:
    fontSize: 20,
    paddingBottom: 20,
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
