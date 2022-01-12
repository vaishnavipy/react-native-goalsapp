import { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [inputGoal, setInputGoal] = useState('');
  const [goalList, setGoalList] = useState([]);
  const [id, setId] = useState(0);

  const handleAddGoal = () => {
    setGoalList((previousGoals) => [
      ...previousGoals,
      { key: id, value: inputGoal },
    ]);
    setId((previousState) => previousState + 1);
    setInputGoal('');
  };

  const deleteGoal = (id) => {
    setGoalList((previousGoals) =>
      previousGoals.filter((goals) => goals.key !== id)
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deleteGoal(item.key);
        }}>
        <View style={styles.goalList}>
          <Text style={styles.goal}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your goal.."
          value={inputGoal}
          onChangeText={setInputGoal}
        />
        <Button title="ADD" onPress={handleAddGoal} />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList data={goalList} renderItem={renderItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    borderWidth: 1,
  },
  flatListContainer: { width: '100%', margin: 30 },
  goalList: {
    alignItems: 'center',
  },
  goal: {
    borderWidth: 1,
    width: '100%',
    padding: 5,
    margin: 5,
    backgroundColor: '#ccc',
  },
});
