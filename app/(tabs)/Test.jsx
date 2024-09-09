/*import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class test extends Component {
  render() {
    return (
      <View>
        <Text style={{color:'green', display:'flex', alignItems:'center', justifyContent:'center'}}> textInComponent </Text>
      </View>
    );
  }
}

export default test;*/

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const test = () => {
  return (
    <View>
        <Text style={{color:'green', display:'flex', alignItems:'center', justifyContent:'center'}}> textInComponent </Text>
      </View>
  )
}

export default test

const styles = StyleSheet.create({})
