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
      { name: 'African', id: 1 },
      { name: 'American', id: 2 },
      { name: 'British', id: 3 },
      { name: 'Cajun', id: 4 },
      { name: 'Caribbean', id: 5 },
      { name: 'Chinese', id: 6 },
      { name: 'Eastern European', id: 7 },
      { name: 'European', id: 8 },
      { name: 'French', id: 9 },
      { name: 'German', id: 10 },
      { name: 'Greek', id: 11 },
      { name: 'Indian', id: 12 },
      { name: 'Irish', id: 13 },
      { name: 'Italian', id: 14 },
      { name: 'Japanese', id: 15 },
      { name: 'Jewish', id: 16 },
      { name: 'Korean', id: 17 },
      { name: 'Latin American', id: 18 },
      { name: 'Mediterranean', id: 19 },
      { name: 'Mexican', id: 20 },
      { name: 'Middle Eastern', id: 21 },
      { name: 'Nordic', id: 22 },
      { name: 'Southern', id: 23 },
      { name: 'Spanish', id: 24 },
      { name: 'Thai', id: 25 },
      { name: 'Vietnamese', id: 26 },
    ]
  }
]

export default class CuisineSelector extends Component {
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
          selectText='Pick Cuisines...'
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          searchPlaceholderText='Search Cuisines'
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
