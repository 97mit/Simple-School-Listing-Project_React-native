import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
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
import axios from 'axios';
import {BASE_URL} from '../../utils/Constants';
import SInfo from 'react-native-sensitive-info';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// import Header from '../../components/header';

// StatusBar.setBackgroundColor('rgb(237,36,42)');
// StatusBar.setBarStyle('light-content');

class editToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      edit_modalVisible: false,
      user_todolist: [],
      newTodoName: '',
      selectedIndex: -1,
      newTodoChecked: false,
      auth_token: '',
    };
  }
  sendMessage = link => {
    this.props.parentCallback(link);
  };
  addTodoList = () => {
    this.setState({
      newTodoName: '',
      newTodoChecked: false,
      selectedIndex: -1,
      edit_modalVisible: true,
    });
    //alert(JSON.stringify(this.state.user_todolist));
  };
  updateTodoList = (item, index) => {
    this.setState({
      newTodoName: item.name,
      selectedIndex: index,
      newTodoChecked: item.checked,
      edit_modalVisible: true,
    });
  };
  deleteTodo = index => {
    let all_list = this.state.user_todolist;
    all_list.splice(index, 1);
    this.setState({user_todolist: all_list});
  };
  askeTodelete = index => {
    Alert.alert(
      'Delete Todo',
      'Do you want to delete this todo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => this.deleteTodo(index),
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  _renderTodoItem = (item, index) => {
    return (
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
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            this.updateTodoList(item.item, item.index);
          }}>
          <Text style={styles.checkedText}>{item.item.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.askeTodelete(item.index)}>
          <Icon
            name="ios-trash"
            style={{fontSize: 20, color: 'gray', paddingHorizontal: 10}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  componentDidMount(): void {
    this.setState({user_todolist: this.props.user_todolist});
    SInfo.getItem('auth_token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({auth_token: value});
    });
  }

  closeAddTodo = () => {
    if (this.state.selectedIndex < 0) {
      let all_list = this.state.user_todolist;
      all_list.push({name: this.state.newTodoName, checked: true});
      this.setState({user_todolist: all_list, edit_modalVisible: false});
    } else {
      let all_list = this.state.user_todolist;
      all_list[this.state.selectedIndex].name = this.state.newTodoName;
      all_list[this.state.selectedIndex].checked = this.state.newTodoChecked;
      //all_list.push({name: this.state.newTodoName, checked: true});
      this.setState({user_todolist: all_list, edit_modalVisible: false});
    }
  };

  sendData = () => {
    this.setState({loading: true});
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.auth_token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/users/${
        this.props.author_id
      }?context=edit`,

      data: {
        meta: {
          user_todolist: JSON.stringify(this.state.user_todolist),
        },
      },
    })
      .then(response => {
        this.setState({loading: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: true});
      });
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.heading}>To Do List</Text>
            <TouchableOpacity
              onPress={() => this.sendMessage(false)}
              style={{
                alignSelf: 'flex-end',
                borderRadius: 7,
                marginHorizontal: 10,
              }}>
              <Icon name={'md-close'} />
            </TouchableOpacity>
          </View>

          <Text style={styles.disclaimer}>
            Please refer to school profile for a list of required documents.
            Following is a list of documents commonly required for most schools
          </Text>
          <FlatList
            extraData={this.state}
            data={this.state.user_todolist}
            renderItem={this._renderTodoItem}
            keyExtractor={(item, index) => index.toString()}
          />
          {/*<View style={styles.todoListItem}>
            <CheckBox color="black" checked={false} />
            <Text style={styles.checkedText}>Parents' Passport Copies</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox color="black" checked={false} />
            <Text style={styles.checkedText}>Child's Passport Copies</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox color="black" checked={true} />
            <Text style={[styles.checkedText, {color: 'black'}]}>
              Child's Birth Certificate
            </Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox color="black" checked={false} />
            <Text style={styles.checkedText}>Child's Passport Size Photos</Text>
          </View>
          <View style={styles.todoListItem}>
            <CheckBox color="black" checked={false} />
            <Text style={styles.checkedText}>Parents Aadhar Card Copies</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.todoListItem}>
              <CheckBox color="black" checked={false} />
              <Text style={styles.checkedText}>Question List Practise</Text>
            </View>
            <View style={{paddingRight: 5}}>
              <Icon name="ios-trash" style={{fontSize: 20, color: 'gray'}} />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.todoListItem}>
              <CheckBox color="black" checked={false} />
              <Text style={styles.checkedText}>
                Call all schools to set appoinments
              </Text>
            </View>
            <View style={{paddingRight: 5}}>
              <Icon name="ios-trash" style={{fontSize: 20, color: 'gray'}} />
            </View>
          </View>*/}
          <TouchableOpacity
            onPress={() => this.addTodoList()}
            style={styles.addItem}>
            <Image style={styles.icon} source={require('@Assets/plus.png')} />
            {/* <Icon name="md-disc" style={styles.icon} /> */}
            <Text style={styles.addtolistText}>Add to List</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.LastView}>
          <Button onPress={() => this.sendData()} style={styles.button}>
            <Body>
              <Text style={styles.buttonLabel}>Save</Text>
            </Body>
          </Button>
        </View>
        {this.state.loading && (
          <ActivityIndicator
            style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.edit_modalVisible}
          onRequestClose={() => {
            this.setState({edit_modalVisible: false});
          }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({edit_modalVisible: false})}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: 'white',
                  elevation: 5,
                  padding: 10,
                  borderRadius: 7,
                }}>
                {/*<TouchableOpacity
                onPress={() => this.setState({edit_modalVisible: false})}
                style={{
                  alignSelf: 'flex-end',
                  borderRadius: 7,
                  marginHorizontal: 10,
                }}>
                <Icon name={'md-close'} />
              </TouchableOpacity>*/}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    color="#0565b8"
                    onPress={() => {
                      this.setState({
                        newTodoChecked: !this.state.newTodoChecked,
                      });
                    }}
                    checked={this.state.newTodoChecked}
                  />
                  <TextInput
                    placeholder="Todo Name here"
                    style={{
                      flex: 1,
                      marginLeft: 20,
                      borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'gray',
                    }}
                    value={this.state.newTodoName}
                    onChangeText={text => {
                      this.setState({
                        newTodoName: text,
                      });
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.closeAddTodo()}
                  style={{
                    alignSelf: 'flex-end',
                    backgroundColor: '#0565b8',
                    borderRadius: 7,
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      color: 'white',
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

export default editToDo;

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
    // borderColor: 'red',
    borderWidth: 0.35,
    borderRadius: 10,
    margin: 20,
    marginTop: 20,
    flexDirection: 'column',
    elevation: 3,
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
    flex: 1,
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
    flex: 1,
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
  LastView: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});
