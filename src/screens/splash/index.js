import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SInfo from 'react-native-sensitive-info';

StatusBar.setBackgroundColor('rgba(0,0,0,0)');
StatusBar.setBarStyle('light-content');
StatusBar.setTranslucent(true);

class Splash extends Component {
  state = {};

  performTimeConsumingTask = async () => {
    console.log('time increased');
    return new Promise(resolve =>
      setTimeout(() => {
        this.getAuth();
        //this.props.navigation.navigate('Auth');
        resolve('result');
      }, 2000),
    );
  };

  getAuth = () => {
    console.log('get Auth called');
    SInfo.getAllItems({
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(ret => {
      console.log('Returned Values from Local Storage', ret);
      if (ret[0].length <= 0) {
        this.props.navigation.navigate('Auth');
        return;
      }
      let pass, isauth, emai;
      ret[0].map((index, i) => {
        return index.key === 'password'
          ? (pass = i)
          : index.key === 'email'
          ? (emai = i)
          : index.key === 'isAuth'
          ? (isauth = i)
          : null;
      });
      console.log(pass, isauth, emai, ret[0][isauth].value);
      if (ret[0][isauth].value === 'true') {
        // this.setState({
        //   auth: true,
        //   email: ret[0][emai].value,
        //   password: ret[0][pass].value,
        //   loading: false,
        // });
        this.props.navigation.navigate({
          routeName: 'CompleteProfile',
          params: {
            auth: true,
            email: ret[0][emai].value,
            password: ret[0][pass].value,
            loading: false,
          },
        });
        console.log('App called');
        // let route = 0;
        console.log('Called Before');
        let route;
        ret[0].map((index, i) => {
          console.log(index.key);
          return index.key === 'complete' ? (route = i) : null;
        });
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
        //       email: ret[0][emai].value,
        //       password: ret[0][pass].value,
        //       // cookie: ret[0][3].value,
        //     },
        //   });
        // }
        // //  else {
        // else if (
        //   ret[0][route].value === 'false'
        //   // ret[0][route].value === undefined
        // ) {
        //   this.props.navigation.navigate({
        //     routeName: 'CompleteProfile',
        //     params: {
        //       email: ret[0][emai].value,
        //       password: ret[0][pass].value,
        //       // cookie: ret[0][3].value,
        //     },
        //   });
        // } else {
        //   console.log('THIS RUN ELSE CASE');
        //   this.props.navigation.navigate({
        //     routeName: 'UserProfile',
        //     params: {
        //       email: ret[0][emai].value,
        //       password: ret[0][pass].value,
        //       // cookie: ret[0][3].value,
        //     },
        //   });
        // }
        // }
        //  console.log('Called After');
      } else {
        console.log('Auth called');
        this.props.navigation.navigate('Auth');
      }
    });
  };

  componentDidMount() {
    this.performTimeConsumingTask();
  }

  render() {
    return (
      <View
        style={{
          // backgroundColor: '#0565b8',
          height: hp(100),
        }}>
        {/* <StatusBar /> */}
        <Image
          style={styles.image}
          source={require('@Assets/splash_screen.jpg')}
        />
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  image: {
    height: hp(100),
    width: width,
  },
});
