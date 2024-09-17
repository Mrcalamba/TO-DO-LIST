import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); 
  const [editKey, setEditKey] = useState(null); 
  const [editText, setEditText] = useState(''); 

  const blinkAnim = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

 
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Math.random().toString(), name: task }]);
      setTask(''); 
    }
  };

 
  const removeTask = (taskKey) => {
    setTasks(tasks.filter(item => item.key !== taskKey)); 
  };

  
  const startEditTask = (task) => {
    setEditKey(task.key); 
    setEditText(task.name); 
  };

  
  const confirmEditTask = () => {
    setTasks(tasks.map(item => (item.key === editKey ? { ...item, name: editText } : item))); 
    setEditKey(null); 
    setEditText(''); 
  };

  return (
    <LinearGradient
      colors={['#FF9A8B', '#FF6F61', '#D4A5A5', '#FFB5A7', '#FFDAC1']} 
      style={styles.container}
    >
      <View style={styles.titleBox}>
        <Animated.Text
          style={[
            styles.title,
            {
              opacity: blinkAnim,
            },
          ]}
        >
           To-do-List - (mobile pogramming)
        </Animated.Text>
      </View>

      {/* TextInput for entering the task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="rgb(150, 150, 150)"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList to display tasks */}
      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            {/* Check if the task is being edited */}
            {editKey === item.key ? (
              <TextInput
                style={styles.input}
                value={editText}
                onChangeText={setEditText}
              />
            ) : (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.name}</Text>
              </View>
            )}

            {/* Edit and Delete buttons */}
            <View style={styles.actionButtons}>
              {editKey === item.key ? (
                <TouchableOpacity style={styles.confirmButton} onPress={confirmEditTask}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => startEditTask(item)}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.deleteButton} onPress={() => removeTask(item.key)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.key} 
      />

      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    justifyContent: 'flex-start', 
  },
  titleBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderColor: 'rgb(200, 200, 200)', 
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(51, 51, 51)', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(200, 200, 200)', 
    padding: 10,
    fontSize: 18,
    backgroundColor: 'rgb(255, 255, 255)', 
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2, 
  },
  addButton: {
    backgroundColor: 'rgb(85, 184, 85)', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 10, 
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  addButtonText: {
    color: 'rgb(255, 255, 255)', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15, 
    paddingHorizontal: 10,
  },
  taskItem: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgb(255, 255, 255)', 
    borderColor: 'rgb(220, 220, 220)', 
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2, 
  },
  taskText: {
    fontSize: 16,
    color: 'rgb(51, 51, 51)', 
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: 'rgb(255, 165, 0)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10, 
  },
  editButtonText: {
    color: 'rgb(255, 255, 255)', 
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'rgb(0, 128, 0)', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButtonText: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'rgb(255, 77, 77)', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'rgb(255, 255, 255)', 
    fontWeight: 'bold',
  },
});
