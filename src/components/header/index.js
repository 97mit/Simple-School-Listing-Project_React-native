import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';

import {Header, Body, Right, Button, Icon, Title, Container} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const head = props => {
  return (
    // <View style={styles.container}>
    <Header
      androidStatusBarColor={props.clr}
      style={{
        backgroundColor: props.clr,
        paddingLeft: 30,
        elevation: 0,
        marginTop: 20,
      }}>
      <Body style={{flex: 1}}>
        <Title>{props.title}</Title>
        {props.subtitle !== undefined ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              style={{color: 'rgb(253,236,0)', fontSize: 20}}
              // fontSize={30}
              name="ios-person"
            />
            <Text style={{color: 'rgb(253,236,0)', padding: 5}}>
              {props.subtitle}
            </Text>
          </View>
        ) : null}
      </Body>
      <Right style={{flex: 1}}>
        <Button
          onPress={() =>
            props.navigation.navigate({
              routeName: props.route,
            })
          }
          transparent>
          <Icon name={props.icon} />
        </Button>
      </Right>
    </Header>
    // </View>
    // <View style={[styles.container, {backgroundColor: props.clr}]}>
    //   <View>
    //     <Text style={styles.text}>{props.title}</Text>
    //   </View>
    //   <View>
    //     {/* <Button transparent> */}
    //     <Icon
    //       style={{color: 'white', padding: 10, marginTop: 10, fontSize: 20}}
    //       name={props.icon}
    //     />
    //     {/* </Button> */}
    //   </View>
    // </View>
  );
};

export default head;

const styles = StyleSheet.create({
  container: {
    height: hp(20),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // padding: 20,
  },
  text: {
    margin: 20,
    paddingTop: 20,
    fontSize: 16,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'Muli-SemiBold',
  },
});

// <View>
//        <Header>
//           <Left style={{
//            flex:1
//            }}>
//               <Image source ={backIcon}/>
//           </Left>
//           <Body style={{
//              flex:1
//                }}>
//             <Title style={{
//                 justifyContent:'centre'
//               }}>My Title</Title>
//           </Body>
//           <Right style={{
//              flex:1
//            }}>
//               <Image source ={homeIcon}/>
//           </Right>
//        </Header>

//       </View>
