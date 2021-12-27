import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {styles} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.imageBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          //header
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 5,
              }}>
              HomeScreen
            </Text>
          }
          data={simplePokemonList}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          keyExtractor={item => String(item.id)}
          //Infinit Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          // Indicator Footer
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color="grey" size={20} />
          }
        />
      </View>
    </>
  );
};
