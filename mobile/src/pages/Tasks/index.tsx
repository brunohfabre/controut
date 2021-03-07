import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ModalOverlay,
  Modal,
  ModalButtons,
  CancelButton,
  CancelButtonText,
  AddButton,
  AddButtonBackground,
  AddButtonText,
  Input,
  Container,
  Title,
  List,
  ListTitle,
  ListItem,
  Checkbox,
  ListItemText,
  AddTaskButton,
  AddTaskButtonBackground,
} from './styles';

interface Task {
  id: number;
  title: string;
}

export function Tasks(): JSX.Element {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [value, setValue] = useState('');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);

  useEffect(() => {
    async function preventSplashScreen() {
      await SplashScreen.preventAutoHideAsync();

      const [syncTasks, syncCompleted] = await AsyncStorage.multiGet([
        '@Controut:tasks',
        '@Controut:completed',
      ]);

      if (syncTasks[1]) {
        setTasks(JSON.parse(syncTasks[1]));
      }

      if (syncCompleted[1]) {
        setCompleted(JSON.parse(syncCompleted[1]));
      }

      await SplashScreen.hideAsync();
    }

    preventSplashScreen();
  }, []);

  function closeModal(): void {
    setModalIsVisible(false);

    setValue('');
  }

  async function completeTask(id: number) {
    const findTask = tasks.find(task => task.id === id);

    if (!findTask) {
      return;
    }

    const newTasks = tasks.filter(task => task.id !== id);
    const newCompleted = [...completed, findTask];

    setTasks(newTasks);
    setCompleted(newCompleted);

    await AsyncStorage.multiSet([
      ['@Controut:tasks', JSON.stringify(newTasks)],
      ['@Controut:completed', JSON.stringify(newCompleted)],
    ]);
  }

  async function moveTaskToProgress(id: number) {
    const findTask = completed.find(task => task.id === id);

    if (!findTask) {
      return;
    }

    const newCompleted = completed.filter(task => task.id !== id);
    const newTasks = [...tasks, findTask];

    setCompleted(newCompleted);
    setTasks(newTasks);

    await AsyncStorage.multiSet([
      ['@Controut:completed', JSON.stringify(newCompleted)],
      ['@Controut:tasks', JSON.stringify(newTasks)],
    ]);
  }

  async function handleSubmit(): Promise<void> {
    if (!value) {
      Alert.alert(
        'Ops!',
        'Por favor, preencha o campo para adicinar uma nova tarefa.',
      );

      return;
    }

    const newTask = {
      id: tasks.length + 1,
      title: value,
    };

    const newTasks = [...tasks, newTask];

    setTasks(newTasks);

    await AsyncStorage.setItem('@Controut:tasks', JSON.stringify(newTasks));

    closeModal();
  }

  function deleteTask(id: number, type: string): void {
    Alert.alert(
      'Cuidado',
      'Deseja realmente excluir essa tarefa?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            if (type === 'tasks') {
              const newTasks = tasks.filter(task => task.id !== id);

              setTasks(newTasks);

              await AsyncStorage.setItem(
                '@Controut:tasks',
                JSON.stringify(newTasks),
              );
            } else if (type === 'completed') {
              const newCompleted = completed.filter(task => task.id !== id);

              setCompleted(newCompleted);

              await AsyncStorage.setItem(
                '@Controut:completed',
                JSON.stringify(newCompleted),
              );
            }
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <Title>Tasks</Title>

        <List>
          <ListTitle>Tasks - {tasks.length}</ListTitle>

          {tasks.map(task => (
            <ListItem
              key={task.id}
              onPress={() => completeTask(task.id)}
              onLongPress={() => deleteTask(task.id, 'tasks')}
            >
              <Checkbox />
              <ListItemText>{task.title}</ListItemText>
            </ListItem>
          ))}
        </List>

        <List>
          <ListTitle>Completed - {completed.length}</ListTitle>

          {completed.map(task => (
            <ListItem
              key={task.id}
              onPress={() => moveTaskToProgress(task.id)}
              onLongPress={() => deleteTask(task.id, 'completed')}
            >
              <Checkbox isCompleted>
                <FontAwesome5 name="check" size={16} color="#202024" />
              </Checkbox>
              <ListItemText isCompleted>{task.title}</ListItemText>
            </ListItem>
          ))}
        </List>

        <AddTaskButton onPress={() => setModalIsVisible(!modalIsVisible)}>
          <AddTaskButtonBackground
            colors={['#4C2FFC', '#952FFC', '#FC2FF5']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Feather name="plus" color="#fff" size={24} />
          </AddTaskButtonBackground>
        </AddTaskButton>

        {modalIsVisible && (
          <ModalOverlay onPress={closeModal}>
            <Modal>
              <Input
                placeholder="Digite o nome da terefa"
                placeholderTextColor="#4D4D57"
                autoFocus
                value={value}
                onChangeText={setValue}
              />

              <ModalButtons>
                <CancelButton onPress={closeModal}>
                  <CancelButtonText>Cancel</CancelButtonText>
                </CancelButton>

                <AddButton onPress={handleSubmit}>
                  <AddButtonBackground
                    colors={['#4C2FFC', '#952FFC', '#FC2FF5']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <AddButtonText>Add task</AddButtonText>
                  </AddButtonBackground>
                </AddButton>
              </ModalButtons>
            </Modal>
          </ModalOverlay>
        )}
      </Container>
    </KeyboardAvoidingView>
  );
}
