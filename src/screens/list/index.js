import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import {Icon} from 'native-base';
import {BASE_URL} from '../../utils/Constants';

const {width, height} = Dimensions.get('window');
import Header from '@Components/header';
import School from '@Components/school';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import {TextInput} from 'react-native-gesture-handler';
import Favorite from '@Components/favorite';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      fav: false,
      data: [],
      favoriteSchool: [],
      loaded: false,
      loading: false,
      author_id: '',
    };
    this.getFavoriteSchoolList();
  }

  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-disc" style={{color: tintColor}} />
    ),
    header: null,
  };

  list = () => {
    this.setState({
      loading: true,
    });
    axios
      .get(`${BASE_URL}wp-json/wp/v2/job_listing`)
      .then(response => {
        this.setState({
          data: response.data,
          loaded: true,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   loading: false,
        // });
      });
  };
  removeFavoriteView = index => {
    let temp_favoriteSchool = this.state.favoriteSchool;
    temp_favoriteSchool.splice(index, 1);

    this.setState({favoriteSchool: temp_favoriteSchool});
  };
  getFavoriteSchoolList = async () => {
    this.setState({
      loading: true,
    });
    await axios
      .get(
        `${BASE_URL}wp-json/wp/v2/astoundify_favorite/?author=${
          this.state.author_id
        }`,
      )
      .then(response => {
        //alert(JSON.stringify(response.data));
        console.log('DATA=======');
        this.setState({
          favoriteSchool: response.data,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  };

  componentDidMount() {
    SInfo.getItem('author_id', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({author_id: value});
    });
    this.list();
  }
  _renderItem = (item, index) => {
    return (
      <School
        id={''}
        favorite_id={item.item.id}
        school_id={item.item.metadata._target_id[0]}
        {...this.props}
        //key={index}
        index={index}
        name={''}
        location={''}
        isFavorite={true}
        removeFavoriteView={this.removeFavoriteView}
        data={[]}
      />
    );
  };
  render() {
    console.log(this.state);
    return (
      <View
        style={{
          flex: 1,
          // marginTop: 10,
          // padding
          backgroundColor: this.state.fav ? 'rgb(237,36,42)' : 'white',
        }}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#0565b8" /> */}
        {/* <View style={{padding:10}}> */}
        <Header
          title="All Schools"
          //subtitle="Vivan Parikh"
          clr="#0565b8"
          icon="ios-person"
          route="UserProfile"
          {...this.props}
        />

        {this.state.fav ? null : (
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgb(244,244,244)',
              padding: 15,
              elevation: 2,
              height: hp(5),
              // margin: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderRightColor: 'gray',
                borderRightWidth: 1,
                width: wp(20),
                // padding: 10,
              }}>
              <Image
                source={require('@Assets/university.png')}
                style={{height: 20, paddingRight: 2}}
                resizeMode="contain"
              />
              <Text style={{color: 'gray', fontWeight: 'bold'}}>School</Text>
            </View>
            <View
              style={{
                width: wp(70),
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="md-search"
                  style={{fontSize: 14, padding: 12, paddingRight: 5}}
                />
                <TextInput
                  // inlineImageLeft="search_icon"
                  name="Name"
                  placeholder="Type search here"
                  style={{height: 40, color: 'gray', fontSize: 10}}
                  onChangeText={text => {
                    this.setState({
                      value: text,
                    });
                  }}
                  value={this.state.value}
                />
              </View>
              <Icon
                name="ios-arrow-dropleft"
                style={{fontSize: 15, padding: 10}}
              />
            </View>
          </View>
        )}

        {this.state.fav ? (
          <View
            style={{
              backgroundColor: 'rgb(237,36,42)',
              height: hp(6),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="ios-heart"
                  style={{color: 'white', fontSize: 15, padding: 15}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    fontFamily: 'Muli-SemiBold',
                  }}>
                  My List
                </Text>
              </View>
              <View>
                <Icon
                  onPress={() => {
                    this.setState({
                      fav: !this.state.fav,
                    });
                  }}
                  name="ios-arrow-down"
                  style={{color: 'white', fontSize: 15, padding: 15}}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={{padding: 15, paddingBottom: 2}}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: 'Muli-SemiBold',
                color: 'gray',
              }}>
              Select Preferred Schools
            </Text>
          </View>
        )}
        <ScrollView>
          {this.state.data.length > 0
            ? this.state.data.map((index, i) => {
                return this.state.value === '' ? (
                  <School
                    key={i}
                    {...this.props}
                    id={index.id}
                    name={index.title.rendered}
                    location={index.meta._job_location}
                    data={index.pure_taxonomies.school_board}
                  />
                ) : index.title.rendered
                    .toLowerCase()
                    .includes(this.state.value.toLowerCase()) ? (
                  <School
                    {...this.props}
                    key={i}
                    id={index.id}
                    name={index.title.rendered}
                    location={index.meta._job_location}
                    data={index.pure_taxonomies.school_board}
                  />
                ) : null;
              })
            : null}
        </ScrollView>

        {this.state.fav ? (
          <View
            style={{
              backgroundColor: '#fff',
              height: hp(100),
              width: wp(95),
              margin: 10,
            }}>
            {this.state.favoriteSchool.length > 0 ? (
              <FlatList
                extraData={this.state}
                data={this.state.favoriteSchool}
                renderItem={this._renderItem}
              />
            ) : null}
            <Text>fdsfdsfdsfa</Text>
            {/* <School {...this.props} name="St Joseph's College" />
            <School {...this.props} name="Aditya Birla World Academy" /> */}

            {/* </View> */}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'rgb(237,36,42)',
              height: hp(6),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="ios-heart"
                  style={{color: 'white', fontSize: 15, padding: 15}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 17,
                    fontFamily: 'Muli-SemiBold',
                  }}>
                  My List
                </Text>
              </View>
              <View>
                <Icon
                  onPress={() => {
                    this.getFavoriteSchoolList();
                    this.setState({
                      fav: !this.state.fav,
                    });
                  }}
                  name="ios-arrow-up"
                  style={{color: 'white', fontSize: 15, padding: 15}}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default List;
