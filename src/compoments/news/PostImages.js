// import React from 'react';
// import { View, Image, FlatList, StyleSheet, Text } from 'react-native';

// const PostImages = ({ images }) => {
//   const renderItem = ({ item }) => (
//     <Image source={item} style={styles.image} resizeMode="cover" />
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={images}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       />
//       {images.length > 4 && (
//         <View style={styles.overlay}>
//           <Text style={styles.overlayText}>+{images.length - 4}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//     borderRadius: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 0, 0.6)',
//     width: 100,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   overlayText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default PostImages;
