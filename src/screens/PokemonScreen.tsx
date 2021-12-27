import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../components/FadeInImage';
import {PokemonDetails} from '../components/PokemonDetails';
import {usePokemon} from '../hooks/usePokemon';
import {RootStackParams} from '../navigator/Navigator';

interface Props
  extends NativeStackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {name, id, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.pop()}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        {/* POKEMON NAME */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 35,
          }}>
          {name + '\n'}#{id}
        </Text>
        {/* POKEMON BOLA */}
        <Image
          style={styles.pokeBall}
          source={require('../assets/pokebola-blanca.png')}
        />
        <FadeInImage style={styles.pokemonImage} uri={picture} />
      </View>
      {/* DETALHES */}

      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 300,
    zIndex: 300,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeBall: {
    width: 200,
    height: 200,
    bottom: -20,
    opacity: 0.5,
  },
  pokemonImage: {
    width: 180,
    height: 180,
    position: 'absolute',
    zIndex: 100,
    bottom: -20,
    left: 50,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
