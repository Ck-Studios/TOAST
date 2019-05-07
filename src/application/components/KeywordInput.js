import {Mutation} from "react-apollo";
import {CREATE_KEYWORD, GET_KEYWORDS} from "../../utils/ApolloQuery";
import {TextInput, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import React, {Component} from "react";

export default class KeywordInput extends Component {
  constructor() {
    super();
    this.state = {input: ''};
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_KEYWORD}
        update={(cache, {data: {createKeyword}}) => {
          const {archivedKeywords} = cache.readQuery({query: GET_KEYWORDS});
          cache.writeQuery({
            query: GET_KEYWORDS,
            data: {archivedKeywords: archivedKeywords.concat([createKeyword])}
          });
        }}
      >
        {createKeyword => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={'키워드를 입력하세요'}
              underlineColorAndroid={'transparent'}
              onChangeText={(keyword) => {
                this.setState({input: keyword});
              }}
              value={this.state.input}
              onSubmitEditing={() => {
                if (this.state.input === '') return;
                createKeyword({variables: {word: this.state.input}});
                this.setState({input: ''});
              }}
            />

            <TouchableOpacity
              onPress={() => {
                if (this.state.input.trim() === '') return;
                createKeyword({variables: {word: this.state.input.trim()}});
                this.setState({input: ''});
              }}>
              <Icon name={'plus'} style={styles.icon} size={18} color={'black'}/>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    alignSelf: 'center',
    margin: 10,
    marginRight: 10,
  },
  input: {
    paddingLeft: 15,
    flex: 1,
    fontSize: 17,
    color: 'black',
    fontFamily: 'NanumSquareR',
  },

});