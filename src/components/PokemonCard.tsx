import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageColors from 'react-native-image-colors';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const navigation = useNavigation();

  const getColors = async (uri: string) => {
    const colors = await ImageColors.getColors(uri, {});

    let primary;

    switch (colors.platform) {
      case 'android':
        primary = colors.dominant;
        break;
      case 'ios':
        primary = colors.primary;
    }

    setBgColor(primary || 'grey');

    return [primary];
  };

  useEffect(() => {
    getColors(pokemon.picture);
  }, []);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('PokemonScreen', {
            simplePokemon: pokemon,
            color: bgColor,
          })
        }>
        <View
          style={{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor,
          }}>
          <View>
            <Text style={styles.name}>
              {pokemon.name}
              {'\n#' + pokemon.id},
            </Text>
          </View>

          <View style={styles.pokebolaContainer}>
            <Image
              source={require('../assets/pokebola-blanca.png')}
              style={styles.pokebola}
            />
          </View>

          <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 3,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    position: 'absolute',
    width: 120,
    height: 120,
    right: -8,
    bottom: -8,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
