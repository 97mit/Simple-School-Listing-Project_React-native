/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '@Components/header';
import {BASE_URL} from '../../utils/Constants';

const {width, height} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

class details extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      school_id: this.props.navigation.getParam('school_id'),
      SchoolName: '',
      location: '',
      school_board: [],

      school_batch: '',
      school_registration: '',
      school_cut_off: '',
      school_admission_criteria: '',
      school_contact_details: '',
      school_complete_address: '',
      school_document_required: '',
      _application: '',
      _company_website: '',
      _phone: '',
    };
  }

  componentDidMount(): void {
    this.getSingleSchoolData();
  }

  getSingleSchoolData = async () => {
    this.setState({
      loading: true,
    });
    await axios
      .get(`${BASE_URL}wp-json/wp/v2/job_listing/${this.state.school_id}`)
      .then(response => {
        this.setState({
          SchoolName: response.data.title.rendered,
          location: response.data.meta._job_location,
          school_board: response.data.pure_taxonomies.school_board,

          school_batch: response.data.acf.school_batch,
          school_registration: response.data.acf.school_registration,
          school_cut_off: response.data.acf.school_cut_off,
          school_admission_criteria:
            response.data.acf.school_admission_criteria,
          school_contact_details: response.data.acf.school_contact_details,
          school_complete_address: response.data.acf.school_complete_address,
          school_document_required: response.data.acf.school_document_required,
          _application: response.data.listing_data._application,
          _company_website: response.data.listing_data._company_website,
          _phone: response.data.listing_data._phone,

          loading: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false});
      });
  };
  handleLink() {
    Linking.canOpenURL(this.state._company_website).then(supported => {
      if (supported) {
        Linking.openURL(this.state._company_website);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          // marginTop: hp(3.3),
          backgroundColor: '#fff',
        }}>
        {/* <StatusBar barStyle="light-content" backgroundColor="#0565b8" /> */}
        <Header
          {...this.props}
          title="Children's Profile"
          subtitle="Vivan Parikh"
          clr="#0565b8"
          icon="ios-person"
          route="UserProfile"
        />
        <View>
          <View
            style={{flexDirection: 'row', flex: 1, backgroundColor: '#e20500'}}>
            <Image
              style={{
                height: 60,
                width: 60,
                alignSelf: 'center',
                marginLeft: 5,
              }}
              source={require('../../assets/school.png')}
            />
            <Text style={styles.schoolName}>{this.state.SchoolName}</Text>
            <View style={{padding: 10}}>
              <TouchableOpacity
                onPress={() => this.handleLink()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontSize: 10,
                    color: 'white',
                    textDecorationLine: 'underline',
                    paddingHorizontal: 5,
                  }}>
                  Admission
                </Text>
                <Entypo name={'email'} style={{color: 'white', fontSize: 15}} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontSize: 12,
                    color: 'white',
                    textDecorationLine: 'underline',
                    paddingHorizontal: 5,
                  }}>
                  {''}
                </Text>
                <Feather
                  name={'phone-call'}
                  style={{color: 'white', fontSize: 15}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 3,
                }}>
                <Text
                  textDecorationLine={'underline'}
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontSize: 12,
                    color: 'white',
                    textDecorationLine: 'underline',
                    paddingHorizontal: 5,
                  }}>
                  {''}
                </Text>
                <Ionicons
                  name={'ios-mail'}
                  style={{color: 'white', fontSize: 15}}
                />
              </View>
            </View>
          </View>
          <View style={{height: 5, backgroundColor: 'yellow'}} />
          <View style={styles.iconRow}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Image
                resize
                style={styles.absolute_row_images}
                source={require('../../assets/ribbon.png')}
              />
              <Text style={styles.itemRowText}>
                {this.state.school_board.length > 0
                  ? this.state.school_board.map(function(item, index) {
                      return item.name + '\n';
                    })
                  : ''}
              </Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Image
                resize
                style={styles.absolute_row_images}
                source={require('../../assets/gender_mf.png')}
              />
              <Text style={styles.itemRowText}>{'Co-ed'}</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  padding: 6,
                }}>
                <Image
                  resize
                  style={{height: 23, width: 23}}
                  source={require('../../assets/placeholder.png')}
                />
              </View>
              <Text style={styles.itemRowText}>{this.state.location}</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#1f6bf4'}}>
            <View style={{flexDirection: 'row', flex: 1, paddingTop: 80}}>
              <View style={{flex: 1}}>
                <Text style={styles.insideBoxText}>
                  {this.state.school_batch + '\n'}
                </Text>
                <Text style={styles.boxHeadingText}>Batch</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.insideBoxText}>
                  {this.state.school_registration}
                </Text>
                <Text style={styles.boxHeadingText}>Registration</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.insideBoxText}>
                  {this.state.school_cut_off}
                </Text>
                <Text style={styles.boxHeadingText}>Cut Off</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{padding: 10, paddingTop: 0}}>
          <Text style={{fontFamily: 'Muli-SemiBold', color: 'gray'}}>
            Admission Criteria
          </Text>
          <Text style={styles.text}>
            {this.state.school_admission_criteria}
          </Text>

          <Text
            style={{marginTop: 10, fontFamily: 'Muli-SemiBold', color: 'gray'}}>
            Documents Required
          </Text>
          <Text style={styles.text}>
            {this.state.school_document_required &&
              this.state.school_document_required.replace(/,/gi, '\n')}
          </Text>

          <Text
            style={{marginTop: 10, fontFamily: 'Muli-SemiBold', color: 'gray'}}>
            Contact Details
          </Text>
          <Text style={styles.text}>{this.state.school_contact_details}</Text>

          <Text style={styles.text}>{this.state.school_complete_address}</Text>
        </View>
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
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  iconRow: {
    backgroundColor: 'transparent',
    zIndex: 1,
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    bottom: 0,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Muli-Light',
    color: 'gray',
  },
  itemRowText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    paddingTop: 5,
  },
  absolute_row_images: {
    height: 25,
    width: 25,
    padding: 18,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  insideBoxText: {
    color: 'white',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 15,

    borderColor: 'white',
    padding: 13,
    margin: 10,
  },
  boxHeadingText: {
    color: '#E6FF33',
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#1f6bf4',
    paddingHorizontal: 5,
  },
  schoolName: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    padding: 20,
  },
});
export default details;
