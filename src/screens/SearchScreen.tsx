import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {styles} from '../theme/appTheme';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isFetching, simplePokemonList} = usePokemonSearch();

  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(
        pokemon => pokemon.id === term,
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return (
      <View style={styleLocal.container}>
        <ActivityIndicator size={50} color="#37d1ec" />
        <Text style={styleLocal.textIndicator}>Aguarde...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? top : top + 10,
        marginHorizontal: 20,
      }}>
      <SearchInput onDebounce={value => setTerm(value)} />

      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        //header
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 5,
            }}>
            {term}
          </Text>
        }
        data={pokemonFiltered}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

const styleLocal = StyleSheet.create({
  container: {},
  textIndicator: {
    color: '#000000',
    opacity: 0.7,
  },
});
