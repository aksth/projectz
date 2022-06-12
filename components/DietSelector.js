import React, { Component } from 'react';
import { View } from 'react-native';
import { MyTheme } from '../styles/theme';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

const items = [
  {
    id: 0,
    name: 'Cuisines',
    children: [
      { name: 'Gluten Free', id: 1 },
      { name: 'Ketogenic', id: 2 },
      { name: 'Vegetarian', id: 3 },
      { name: 'Lacto-Vegetarian', id: 4 },
      { name: 'Ovo-Vegetarian', id: 5 },
      { name: 'Vegan', id: 6 },
      { name: 'Pescetarian', id: 7 },
      { name: 'Paleo', id: 8 },
      { name: 'Primal', id: 9 },
      { name: 'Low FODMAP', id: 10 },
      { name: 'Whole30', id: 11 },
    ]
  }
]

export default class DietSelector extends Component {
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
          selectText='Pick Diets...'
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          searchPlaceholderText='Search Diets'
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
