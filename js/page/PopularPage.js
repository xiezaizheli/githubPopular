import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TextInput,
  Text,
  RefreshControl,
} from 'react-native';

import NavigationBar from '../common/NavigationBar';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  render() {
    let navigationBar =
      <NavigationBar
        title={'最热'}
        statusBar={{backgroundColor: "#2196F3"}}
      />;
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollableTabView>
          <PopularTab tabLabel="React">REACT</PopularTab>
          <PopularTab tabLabel="Flow">RLOW</PopularTab>
          <PopularTab tabLabel="javascript">javascript</PopularTab>
        </ScrollableTabView>
      </View>
    )
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    let url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(result => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items)
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => this.renderRow(data)}
        />
      </View>
    )
  }

  renderRow(data) {
    return <RepositoryCell data={data} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  tips: {
    fontSize: 20
  }
});

