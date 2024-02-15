import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import avatar from "../../../assets/img/avatar.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
// Define a new React component called UserStory
const UserStory = props => {
  // Render a container view for the user story
  return (
    <View style={styles.container}>
        <View  style={styles.storyContainer}>
            {props.watched == true ? <View style={styles.userImageContainerWatched}>
                {/* Render an image component with a default profile image */}
                <Image source={avatar} style={styles.imageUser}/>
                {props.check == true ? <View style={styles.containerPlus}>
                    <Text style={styles.plus}>+</Text>
                </View>: <></>
                }
            </View> : <View style={styles.userImageContainer}>
                {/* Render an image component with a default profile image */}
                <Image source={avatar} style={styles.imageUser}/>
                {props.check == true ? <View style={styles.containerPlus}>
                    <Text style={styles.plus}>+</Text>
                </View>: <></>
                }
            </View>}
        </View>
        <Text style={styles.name}>{props.firstName}</Text>
    </View>
  );
};

// Define PropTypes for the UserStory component
UserStory.propTypes = {
  // The first name of the user as a required string
  firstName: PropTypes.string.isRequired,
  check: PropTypes.bool.isRequired,
  watched: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    storyContainer: {
        marginRight: 10,
      },
      container:{
        justifyContent:'center',
        alignContent:'center',
      },
      name: {
        textAlign: 'center',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        marginTop: 8,
      },
      userImageContainer: {
        borderWidth: 1,
        borderColor: '#F35BAC',
        padding: 3,
        borderRadius: 50,
        marginLeft: horizontalScale(15)
      },
    containerPlus:{
        width: 26,
        height: 26,
        backgroundColor: '#0F7FF4',
        borderRadius: 13,
        alignItems: 'center',
        position: 'absolute',
        left: 50,
        bottom: 0,
        borderColor: 'white',
        borderWidth: 4
    },
    plus:{
        fontFamily: 'Inter',
        color: 'white',
        fontWeight: '800',
    },
    imageUser:{
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    userImageContainerWatched:{
        borderWidth: 1,
        borderColor: '#DDDDDD',
        padding: 3,
        borderRadius: 50,
        marginLeft: horizontalScale(15)
    }
  });
export default UserStory;