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
import {Item, Input, Label, Button} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import {BASE_URL} from '../../utils/Constants';

StatusBar.setBackgroundColor('rgba(0,0,0,0)');
StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    validate: null,
    loading: false,
    cookie: '',
  };

  finalRequest = () => {
    if (this.state.password === this.state.cpassword) {
      this.setState({
        validate: true,
      });
      this.registerUser();
    } else {
      this.setState({
        validate: false,
      });
    }
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
    SInfo.setItem('complete', 'false', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(
      value => console.log(value), //value 2
      // this.props.navigation.navigate('App'),
    );
    SInfo.setItem('password', password, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(
      value => console.log(value), //value 3
      // this.props.navigation.navigate('App'),
      this.props.navigation.navigate({
        routeName: 'Main',
        params: {
          cookie: this.state.cookie,
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
        },
      }),
    );
  };

  register = nonce => {
    axios
      .get(
        `${BASE_URL}api/user/register/?username=${
          this.state.email
        }&email=${this.state.email}&nonce=${nonce}&display_name=${
          this.state.name
        }&user_pass=${this.state.password}`,
      )
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          // cookie: res.data.cookie,
        });
        this.setAuth(this.state.email, this.state.password);
      })
      .catch(err => {
        console.log(err);
      });
  };

  registerUser = () => {
    this.setState({
      loading: true,
    });
    // axios.all([
    axios
      .get(`${BASE_URL}api/get_nonce/?controller=user&method=register`)
      .then(response => {
        console.log(response.data);
        // this.setState({
        this.register(response.data.nonce);
      })
      .catch(err => {
        console.log(err);
      });
    // ]);
  };

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: '#0565b8',
          height: hp(100),
        }}>
        <ImageBackground style={styles.container}>
          {/* <StatusBar /> */}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.mainContainer}>
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
              {this.state.validate === false ? (
                <Text>Confirm Password doesn't match</Text>
              ) : (
                <Text />
              )}
              <View style={{width: width / 1.5}}>
                <Item style={styles.item} floatingLabel>
                  <Label style={styles.inputLabel}>Name</Label>
                  <Input
                    style={{color: '#fff'}}
                    value={this.state.name}
                    onChangeText={text => {
                      this.setState({
                        name: text,
                      });
                    }}
                  />
                </Item>
                <Item style={styles.item} floatingLabel>
                  <Label style={styles.inputLabel}>Email</Label>
                  <Input
                    style={{color: '#fff'}}
                    value={this.state.email}
                    onChangeText={text => {
                      this.setState({
                        email: text,
                      });
                    }}
                  />
                </Item>
                <Item style={styles.item} floatingLabel>
                  <Label style={styles.inputLabel}>Password</Label>
                  <Input
                    style={{color: '#fff'}}
                    secureTextEntry
                    value={this.state.password}
                    onChangeText={text => {
                      this.setState({
                        password: text,
                      });
                    }}
                  />
                </Item>
                <Item style={styles.item} floatingLabel>
                  <Label style={styles.inputLabel}>Confirm Password</Label>
                  <Input
                    style={{color: '#fff'}}
                    secureTextEntry
                    value={this.state.cpassword}
                    onChangeText={text => {
                      this.setState({
                        cpassword: text,
                      });
                    }}
                  />
                </Item>
              </View>
              {this.state.loading ? (
                <View style={{padding: 10}}>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.buttonLabel}>Signing Up</Text>
                </View>
              ) : (
                <Button
                  onPress={() => this.finalRequest()}
                  style={styles.button}>
                  <Text style={styles.buttonLabel}> Sign Up </Text>
                </Button>
              )}
              <View style={styles.signupContainer}>
                <Text style={styles.inputLabel}>
                  {' '}
                  Already have an account?
                  {/* {'\n'} */}
                </Text>
                <Text
                  onPress={() => {
                    this.props.navigation.navigate('Auth');
                  }}
                  style={[styles.inputLabel, styles.signupText]}>
                  Login
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
export default Signup;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height,
    width: width,
    backgroundColor: '#0565b8',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    height: hp('10%'),
    width: wp(60),
  },
  smallImage: {
    height: hp(7),
    width: wp(10),
    margin: 20,
    marginBottom: -5,
  },
  mainContainer: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    padding: 10,
    // paddingBottom:
  },
  formContainer: {
    padding: 0,
    // flex: 1,
  },
  inputLabel: {
    color: 'white',
    fontFamily: 'Muli-Regular',
    fontSize: 14,
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
  item: {
    marginTop: 5,
  },
});
