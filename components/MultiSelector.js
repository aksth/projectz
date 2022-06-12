import React, { Component } from 'react';
import { View } from 'react-native';
import { MyTheme } from '../styles/theme';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

export default class MultiSelector extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.selectedItems,
    };
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.onSelection(selectedItems);
  };

  render() {
    return (
      <View>
        <SectionedMultiSelect
          items={this.props.items}
          IconRenderer={MaterialIcons}
          uniqueKey='id'
          subKey='children'
          selectText={'Pick ' + this.props.name + '...'}
          showDropDowns={false}
          readOnlyHeadings={true}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={this.state.selectedItems}
          searchPlaceholderText={'Search ' + this.props.name}
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
