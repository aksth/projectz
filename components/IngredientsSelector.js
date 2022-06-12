import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { MyTheme } from '../styles/theme';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

const items = require('../assets/ingredients.json');

export default class IngredientsSelector extends Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
    };
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey='id'
          subKey='children'
          selectText='Pick Ingredients...'
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          searchPlaceholderText='Search Ingredients'
          showCancelButton={true}
          colors={{
            primary: MyTheme.colors.primary,
            success: MyTheme.colors.primary,
            text: MyTheme.colors.primary,
            subText: MyTheme.colors.text,
            selectToggleTextColor: MyTheme.colors.text,
            searchPlaceholderTextColor: MyTheme.colors.text,
            chipColor: MyTheme.colors.primary,
          }}
          styles={{selectToggle: {paddingTop: 15, paddingBottom: 5,}}}
        />
      </View>
    );
  }
}
