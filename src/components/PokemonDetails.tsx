import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View
        style={{
          ...styles.container,
          marginTop: 310,
        }}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text style={{...styles.regular, marginRight: 10}} key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regular}>{pokemon.weight} (lb)</Text>
      </View>

      {/* SPRITES */}

      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Habilidades */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Abilities Base</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              style={{...styles.regular, marginRight: 10}}
              key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Movimentos */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text style={{...styles.regular, marginRight: 10}} key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Movimentos */}
      <View
        style={{
          ...styles.container,
        }}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, index) => (
            <View key={stat.stat.name + 1} style={{flexDirection: 'row'}}>
              <Text
                style={{...styles.regular, marginRight: 10, width: 150}}
                key={stat.stat.name}>
                {stat.stat.name}
              </Text>

              <Text
                style={{
                  ...styles.regular,
                  fontWeight: 'bold',
                }}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
        {/*SRPRI FINAL */}
        <View style={{marginBottom: 25, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    color: 'red',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  regular: {
    fontSize: 17,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
