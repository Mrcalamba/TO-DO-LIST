import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [task, setTask] = useState(''); // State for the task input
  const [tasks, setTasks] = useState([]); // State to store the list of tasks
  const [editKey, setEditKey] = useState(null); // State to track the task being edited
  const [editText, setEditText] = useState(''); // State for the edited text

  const blinkAnim = useRef(new Animated.Value(1)).current; // Initial opacity of 1

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

  // Function to add a new task to the list
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Math.random().toString(), name: task }]); // Add task to list
      setTask(''); // Clear input
    }
  };

  // Function to remove a task from the list
  const removeTask = (taskKey) => {
    setTasks(tasks.filter(item => item.key !== taskKey)); // Remove task by key
  };

  // Function to start editing a task
  const startEditTask = (task) => {
    setEditKey(task.key); // Set the task key being edited
    setEditText(task.name); // Set the current task text in the input
  };

  // Function to confirm editing a task
  const confirmEditTask = () => {
    setTasks(tasks.map(item => (item.key === editKey ? { ...item, name: editText } : item))); // Update the task name
    setEditKey(null); // Clear edit key
    setEditText(''); // Clear input
  };

  return (
    <LinearGradient
      colors={['#FF9A8B', '#FF6F61', '#D4A5A5', '#FFB5A7', '#FFDAC1']} // More colorful gradient colors
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
           To List
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
        keyExtractor={item => item.key} // Key extractor for FlatList
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
    justifyContent: 'flex-start', // Align items to the top
  },
  titleBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderColor: 'rgb(200, 200, 200)', // Light grey border color
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgb(51, 51, 51)', // Dark grey text color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'rgb(200, 200, 200)', // Light grey border color
    padding: 10,
    fontSize: 18,
    backgroundColor: 'rgb(255, 255, 255)', // White background color
    borderRadius: 5,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2, // Add slight shadow on Android
  },
  addButton: {
    backgroundColor: 'rgb(85, 184, 85)', // Green color for button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 10, // Space between input and button
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 5,
  },
  addButtonText: {
    color: 'rgb(255, 255, 255)', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1, // Allow FlatList to take up remaining space
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15, // Space between tasks
    paddingHorizontal: 10,
  },
  taskItem: {
    flex: 1,
    padding: 15,
    backgroundColor: 'rgb(255, 255, 255)', // White background for task items
    borderColor: 'rgb(220, 220, 220)', // Light grey border color
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2, // Add slight shadow on Android
  },
  taskText: {
    fontSize: 16,
    color: 'rgb(51, 51, 51)', // Dark grey text color
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: 'rgb(255, 165, 0)', // Orange color for edit button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10, // Space between edit and delete buttons
  },
  editButtonText: {
    color: 'rgb(255, 255, 255)', // White text color
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'rgb(0, 128, 0)', // Green color for confirm button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButtonText: {
    color: 'rgb(255, 255, 255)', // White text color
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'rgb(255, 77, 77)', // Red color for delete button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'rgb(255, 255, 255)', // White text color
    fontWeight: 'bold',
  },
});
