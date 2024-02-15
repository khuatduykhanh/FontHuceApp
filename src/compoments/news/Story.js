import { View, Text, StyleSheet, Image, FlatList} from 'react-native'
import React,{useState} from 'react'
import avatar from "../../../assets/img/avatar.png"
import {horizontalScale, verticalScale, scaleFontSize} from "../../utils/scaling"
import UserStory from './UserStory'
const Story = () => {
    const data = [
        {
          firstName: 'Tin của bạn',
          id: 1,
          check: true,
          watched: true,
        },
        {
          firstName: 'Angel',
          id: 2,
          check: false,
          watched: true,
        },
        {
          firstName: 'White',
          id: 3,
          check: false,
          watched: false,
        },
        {
          firstName: 'Olivier',
          id: 4,
          check: false,
          watched: false,
        },
        {
          firstName: 'Nata',
          id: 5,
          check: false,
          watched: false
        },
        {
          firstName: 'Adam',
          id: 6,
          check: false,
          watched: false
        },
        {
          firstName: 'Sean',
          id: 7,
          check: false,
          watched: false
        },
        {
          firstName: 'Nicolas',
          id: 8,
          check: false,
          watched: false
        },
        {
          firstName: 'Frederic',
          id: 9,
          check: false,
          watched: false
        },
      ];
      // Define page size constant for the number of items to be displayed per page
      const pageSize = 4;
      // Define state variable for the current page number
      // so that we know how many pages we have fetched already
      const [pageNumber, setPageNumber] = useState(1);
      // Define state variable for the loading status of the flatlist,
      // will be used when we'll be fetching data on scroll until we complete the fetch
      const [isLoading, setIsLoading] = useState(false);
    
      // Define state variable for the data to be rendered on the page
      const [renderedData, setRenderedData] = useState(data.slice(0, pageSize));
    
      /**
       * function that returns the data for the page to be fetched
       * @param data - all the data
       * @param pageNumber - page number to fetch
       * @param pageSize - number of items to fetch for the page
       */
      const pagination = (data, pageNumber, pageSize) => {
        let startIndex = (pageNumber - 1) * pageSize;
        //don't return the information that does not exist inside the data array
        if (startIndex >= data.length) {
          return [];
        }
        //set the page number, to the page number that we wanted to fetch so that we have information
        //about which page was the one that was last fetched
        setPageNumber(pageNumber);
        return data.slice(startIndex, startIndex + pageSize);
      };
  return (
    <View style={styles.container}>
        {/* <View >
        <Image source={avatar} style={styles.imageUser}></Image>
        <View style={styles.containerPlus}>
            <Text style={styles.plus}>+</Text>
        </View>
        <Text style={styles.nameStory}>Tin của bạn </Text>
        </View> */}
        <FlatList
            //when the user scrolls through half of the data call onEndReached function
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => {
              //if we are not already in the middle of fetching data then fetch the data
              if (!isLoading) {
                //set is loading to true because we just started fetching data
                setIsLoading(true);
                setRenderedData(prev => [
                  ...prev,
                  ...pagination(data, pageNumber + 1, pageSize),
                ]);
                //after updating rendered data we have to set is loading to false, because we loaded the data we needed
                setIsLoading(false);
              }
            }}
            // Hide horizontal scroll indicator
            showsHorizontalScrollIndicator={false}
            // Set FlatList to display horizontally
            horizontal={true}
            // Pass in data to be rendered in FlatList
            data={renderedData}
            // Define how each item should be rendered
            renderItem={({item}) => <UserStory firstName={item.firstName} check={item.check} watched={item.watched}/>}
          />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 100,
        marginTop: 10,
    },
    
})
export default Story