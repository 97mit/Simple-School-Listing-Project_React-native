import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Icon, Toast} from 'native-base';
import {BASE_URL} from '../../utils/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SInfo from 'react-native-sensitive-info';
import axios from 'axios';

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      singleSchoolName: '',
      location: '',
      school_board: [],
      author_id: '',
      auth_token: '',
    };
  }
  componentDidMount() {
    SInfo.getItem('author_id', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({author_id: value});
    });
    SInfo.getItem('auth_token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(value => {
      this.setState({auth_token: value});
    });
    this.getSingleSchoolData();
  }
  getSingleSchoolData = async () => {
    this.setState({
      loading: true,
    });
    await axios
      .get(`${BASE_URL}wp-json/wp/v2/job_listing/${this.props.school_id}`)
      .then(response => {
        //alert(JSON.stringify(response.data));
        this.setState({
          singleSchoolName: response.data.title.rendered,
          location: response.data.meta._job_location,
          school_board: response.data.pure_taxonomies.school_board,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  };

  addToFavorite = () => {
    this.setState({loading: true});
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.auth_token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/astoundify_favorite/`,
      data: {
        status: 'publish',
        author: this.state.author_id,
        metadata: {
          _target_id: this.props.id,
        },
      },
    })
      .then(response => {
        // alert(JSON.stringify(response));
        this.setState({loading: false});
        alert('Added to favorite');
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };
  deleteFromfavorite = async favorite_id => {
    this.setState({
      loading: true,
    });

    axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.auth_token}`,
      },
      url: `${BASE_URL}wp-json/wp/v2/astoundify_favorite/${favorite_id}?force=true`,
      data: {
        //status: 'publish',
        //author: this.state.author_id,
        //fields: {
        //  child_name: this.state.child_name,
        //  child_gender: this.state.child_gender,
        //  child_school_type: this.state.child_school_type,
        //  child_dob: this.state.child_dob,
        //},
      },
    })
      .then(response => {
        this.setState({loading: false});
        this.props.removeFavoriteView(this.props.index);
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      });
  };
  render() {
    // let temp = this.props.data;
    return (
      <View style={{width: wp(100), flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            this.props.navigation.navigate('Details', {
              school_id:
                this.props.id == '' ? this.props.school_id : this.props.id,
            });
          }}>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.rowitem}>
                {/* <Icon name="ios-construct" style={styles.icon} /> */}
                <Image
                  source={require('@Assets/university.png')}
                  style={{height: 15, paddingRight: 2}}
                  resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.big}>
                  {/*{this.props.name.length > 15
                    ? `${this.props.name.substring(
                        0,
                        19,
                      )}\n${this.props.name.substring(19)}`
                    : this.props.name}*/}
                  {this.props.name === ''
                    ? this.state.singleSchoolName
                    : this.props.name}
                </Text>
              </View>
              <View style={styles.rowitem}>
                {/* <Icon name="ios-construct" style={styles.icon} /> */}
                <Image
                  source={require('@Assets/medal.png')}
                  style={{height: 15, paddingRight: 2}}
                  resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.small}>
                  {/* {this.props.data.map((index, i) => {
                    return <Text>{index.name},</Text>;
                  })} */}
                  {this.props.data.length === 0
                    ? this.state.school_board.map(function(item, index) {
                        return item.name + ',';
                      })
                    : this.props.data.map(function(item, index) {
                        return item.name + ',';
                      })}
                </Text>
              </View>
              <View style={styles.rowitem}>
                {/* <Icon name="ios-map" style={styles.icon} /> */}
                <Image
                  source={require('@Assets/placeholder.png')}
                  style={{height: 15, paddingRight: 2, alignSelf: 'center'}}
                  resizeMode="contain"
                />
                <Text numberOfLines={1} style={styles.small}>
                  {/*{`${this.props.location.substring(
                    0,
                    this.props.location.indexOf(')') + 1,
                  )}\n${this.props.location.substring(
                    this.props.location.indexOf(')') + 1,
                  )}`}*/}
                  {this.props.location === ''
                    ? this.state.location
                    : this.props.location}
                  {/* {'\n'}Mumbai */}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.props.isFavorite ? (
          <TouchableOpacity
            onPress={() => this.deleteFromfavorite(this.props.favorite_id)}
            style={{alignSelf: 'center'}}>
            <AntDesign name={'delete'} style={{fontSize: 25}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.addToFavorite()}>
            <View style={{margin: 20}}>
              <Image
                source={require('@Assets/fav.png')}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        )}
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

export default School;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgb(244,244,244)',
    borderRadius: 10,
    margin: 10,
    paddingLeft: 0,
    marginBottom: 5,
    width: wp(80),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // padding: 10,
  },
  small: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Muli-SemiBold',
  },
  big: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Muli-SemiBold',
  },
  rowitem: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
    paddingRight: 5,
  },
});
