import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {
  Container,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  ListItem,
  Item,
  Label,
  Input,
  CheckBox,
} from 'native-base';

// import Header from '../../components/header';
// import {TouchableOpacity} from 'react-native-gesture-handler';

StatusBar.setBackgroundColor('rgb(237,36,42)');
StatusBar.setBarStyle('light-content');

class ToDo extends Component {
  state = {
    ppc: false,
    cpc: false,
    cbc: false,
    cpsp: false,
    pacc: false,
    qlp: false,
    call: false,
  };
  sendMessage = link => {
    console.log('senddata clicked');
    this.props.parentCallback(link);
  };
  _renderTodoItem = (item, index) => (
    <View style={styles.todoListItem}>
      <CheckBox
        color="black"
        onPress={() => {
          this.setState({
            ppc: !this.state.ppc,
          });
        }}
        checked={item.item.checked}
      />
      <Text style={styles.checkedText}>{item.item.name}</Text>
    </View>
  );
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.heading}>To Do List</Text>
          <Text style={styles.disclaimer}>
            Please refer to school profile for a list of required documents.
            Following is a list of documents commonly required for most schools
          </Text>
          <FlatList
            data={this.props.user_todolist}
            renderItem={this._renderTodoItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {/*<View style={styles.todoListItem}>
            <CheckBox
              color="black"
              onPress={() => {
                this.setState({
                  ppc: !this.state.ppc,
                });
              }}
              checked={this.state.ppc}
            />
            <Text style={styles.checkedText}>Parents' Passport Copies</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox
              color="black"
              onPress={() => {
                this.setState({
                  cpc: !this.state.cpc,
                });
              }}
              checked={this.state.cpc}
            />
            <Text style={styles.checkedText}>Child's Passport Copies</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox
              color="black"
              onPress={() => {
                this.setState({
                  cbc: !this.state.cbc,
                });
              }}
              checked={this.state.cbc}
            />
            <Text style={[styles.checkedText, {color: 'black'}]}>
              Child's Birth Certificate
            </Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox
              color="black"
              onPress={() => {
                this.setState({
                  cpsp: !this.state.cpsp,
                });
              }}
              checked={this.state.cpsp}
            />
            <Text style={styles.checkedText}>Child's Passport Size Photos</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox
              color="black"
              onPress={() => {
                this.setState({
                  pacc: !this.state.pacc,
                });
              }}
              checked={this.state.pacc}
            />
            <Text style={styles.checkedText}>Parents Aadhar Card Copies</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.todoListItem}>
              <CheckBox
                color="black"
                onPress={() => {
                  this.setState({
                    qlp: !this.state.qlp,
                  });
                }}
                checked={this.state.qlp}
              />
              <Text style={styles.checkedText}>Question List Practise</Text>
            </View>
            <View style={{paddingRight: 5}}>
              <Icon name="ios-trash" style={{fontSize: 20, color: 'gray'}} />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.todoListItem}>
              <CheckBox
                color="black"
                onPress={() => {
                  this.setState({
                    call: !this.state.call,
                  });
                }}
                checked={this.state.call}
              />
              <Text style={styles.checkedText}>
                Call all schools to set appoinments
              </Text>
            </View>
            <View style={{paddingRight: 5}}>
              <Icon name="ios-trash" style={{fontSize: 20, color: 'gray'}} />
            </View>
          </View>*/}
          <TouchableOpacity
            onPress={() => this.sendMessage(true)}
            style={styles.addItem}>
            <Image style={styles.icon} source={require('@Assets/plus.png')} />
            {/* <Icon name="md-disc" style={styles.icon} /> */}
            <Text style={styles.addtolistText}>Add to List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ToDo;

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
    // padding: 0,
    borderColor: 'black',
    borderWidth: 0.35,
    borderRadius: 10,
    margin: 20,
    marginTop: 0,
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
  heading: {
    fontSize: 20,
    fontFamily: 'Muli-SemiBold',
    color: '#0565b8',
    padding: 10,
    paddingBottom: 2,
  },
  disclaimer: {
    fontFamily: 'Muli-Light',
    fontSize: 10,
    paddingLeft: 10,
    color: 'gray',
  },
  checkedText: {
    color: 'gray',
    paddingLeft: 20,
    // paddingRight: 10,
    fontFamily: 'Muli-Regular',
  },
  todoListItem: {
    flexDirection: 'row',
    padding: 0,
    marginTop: 7,
  },
  addItem: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addtolistText: {
    fontFamily: 'Muli-SemiBold',
    color: '#0565b8',
    padding: 10,
  },
  icon: {
    paddingLeft: 20,
    height: 20,
    width: 20,
  },
});
