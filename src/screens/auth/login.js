import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SInfo from 'react-native-sensitive-info';
import {BASE_URL} from '../../utils/Constants';

StatusBar.setBackgroundColor('rgba(0,0,0,0)');
StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);

class Login extends Component {
  state = {
    user: [],
    email: '',
    password: '',
    loading: false,
    auth: false,
    validation: null,
  };

  setAuth = (email, password) => {
    console.log('set auth called');

    SInfo.setItem('isAuth', 'true', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(
      value => console.log(value), //value 1
    );
    SInfo.setItem('email', email, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(
      value => console.log(value), //value 2
      // this.props.navigation.navigate('App'),
    );
    // SInfo.setItem('cookie', this.state.cookie, {
    //   sharedPreferencesName: 'mySharedPrefs',
    //   keychainService: 'myKeychain',
    // }).then(
    //   value => console.log(value), //value 2
    //   // this.props.navigation.navigate('App'),
    // );
    SInfo.setItem('password', password, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(
      value => console.log(value), //value 3
      // this.props.navigation.navigate('App'),
      // this.props.navigation.navigate({
      //   routeName: 'Main',
      //   params: {
      //     cookie: this.state.cookie,
      //   },
      // }),
    );
  };

  checkAuth = () => {
    this.setState({
      loading: true,
      validation: null,
    });
    axios
      .get(
        `${BASE_URL}api/user/generate_auth_cookie/?email=${
          this.state.email
        }&password=${this.state.password}`,
      )
      .then(response => {
        console.log('Login Response====>' + JSON.stringify(response));
        if (response.data.status === 'ok') {
          this.setAuth(this.state.email, this.state.password);
          this.setState({
            user: response.data.user,
            loading: false,
            auth: true,
          });
          if (this.state.auth) {
            SInfo.setItem('author_id', response.data.user.id.toString(), {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            }).then(
              value => console.log(value), //value 2
            );
            this.props.navigation.navigate({
              routeName: 'CompleteProfile',
              params: {data: this.state.user},
            });
          }
        }
        if (response.data.status === 'error') {
          this.setState({
            loading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          validation: false,
        });
        console.log(err);
      });
  };

  render() {
    // if (this.state.auth) {
    //   this.props.navigation.navigate({
    //     routeName: 'CompleteProfile',
    //     params: {data: this.state.user},
    //   });
    // }
    // SInfo.getAllItems({
    //   sharedPreferencesName: 'mySharedPrefs',
    //   keychainService: 'myKeychain',
    // }).then(ret => {
    //   console.log('Returned Values from Local Storage', ret[0]);
    //   let route;
    //   ret[0].map((index, i) => {
    //     console.log(index.key);
    //     return index.key === 'complete' && index.value === 'true'
    //       : null;
    //   });
    // let sum;
    // let k = 0;
    // while (k !== route.length - 1) {
    //   sum = sum + route[k];
    //   k++;
    // }
    // console.log('Route Var value', route, sum);
    // if (sum === 0) {
    // console.log(route);
    // if (ret[0][route].value === 'true') {
    //   this.props.navigation.navigate({
    //     routeName: 'UserProfile',
    //     params: {
    //       email: ret[0][0].value,
    //       password: ret[0][2].value,
    //       data: this.state.user,
    //       // cookie: ret[0][3].value,
    //     },
    //   });
    // } else {
    //   this.props.navigation.navigate({
    //     routeName: 'CompleteProfile',
    //     params: {
    //       email: ret[0][0].value,
    //       password: ret[0][2].value,
    //       // cookie: ret[0][3].value,
    //       data: this.state.user,
    //     },
    //   });
    // }
    // });
    // }
    return (
      <ScrollView
        style={{
          backgroundColor: '#0565b8',
          height: hp(100),
        }}>
        {/* <StatusBar /> */}
        <ImageBackground style={styles.container}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flex: 0.95,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('@Assets/logo.jpg')}
              />
              <View style={styles.imageContainer}>
                <Image
                  style={styles.smallImage}
                  resizeMode="contain"
                  source={require('@Assets/facebook.png')}
                />
                <Image
                  style={styles.smallImage}
                  resizeMode="contain"
                  source={require('@Assets/google-plus.png')}
                />
              </View>
              {this.state.validation === false ? (
                <Text style={[styles.buttonLabel, {padding: 10}]}>
                  INVALID CREDENTIALS
                </Text>
              ) : (
                <Text />
              )}
              <Form style={{width: width / 1.5}}>
                <Item floatingLabel>
                  <Label style={styles.inputLabel}>Email</Label>
                  <Input
                    onChangeText={text => {
                      this.setState({
                        email: text,
                      });
                    }}
                    value={this.state.email}
                    style={{color: '#fff'}}
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={styles.inputLabel}>Password</Label>
                  <Input
                    secureTextEntry
                    onChangeText={text => {
                      this.setState({
                        password: text,
                      });
                    }}
                    value={this.state.password}
                    style={{color: '#fff'}}
                  />
                </Item>
                {/* <Button style={styles.button}>
              <Text style={styles.inputLabel}> Login </Text>
            </Button> */}
              </Form>
              {this.state.loading ? (
                <View style={{padding: 10}}>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.buttonLabel}>Logging In</Text>
                </View>
              ) : (
                <Button onPress={() => this.checkAuth()} style={styles.button}>
                  <Text style={styles.buttonLabel}> Login </Text>
                </Button>
              )}
              <View style={styles.signupContainer}>
                <Text style={styles.inputLabel}>
                  {' '}
                  Don't have an account?
                  {/* {'\n'} */}
                </Text>
                <Text
                  onPress={() => {
                    this.props.navigation.navigate('Signup');
                  }}
                  style={[styles.inputLabel, styles.signupText]}>
                  Sign Up
                </Text>
              </View>
            </View>
            <View style={styles.lastContainer}>
              <View>
                <Text style={styles.privacyLabel}>T&C</Text>
              </View>
              <View>
                <Text style={styles.privacyLabel}>Privacy & Policy</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
export default Login;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: hp('100%'),
    width: width,
    backgroundColor: '#0565b8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp('10%'),
    width: wp(60),
  },
  smallImage: {
    height: hp(8),
    width: wp(11),
    margin: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  formContainer: {
    padding: 0,
    // flex: 1,
  },
  inputLabel: {
    color: 'white',
    fontFamily: 'Muli-Regular',
  },
  button: {
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 15,
    width: 70,
    height: 30,
    justifyContent: 'center',
    margin: 30,
  },
  buttonLabel: {
    fontFamily: 'Muli-SemiBold',
    color: 'white',
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    textDecorationLine: 'underline',
    fontFamily: 'Muli-SemiBold',
  },
  lastContainer: {
    // bottom: ,
    // marginTop: 60,
    flex: 0.05,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  privacyLabel: {
    fontFamily: 'Muli-Light',
    color: 'white',
  },
});
