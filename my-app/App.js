import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet,SafeAreaView, StatusBar, 
  TouchableOpacity, FlatList, Modal, TextInput, AsyncStorageStatic } from 'react-native';
import {Ionicons} from '@expo/vector-icons'; 
import TaskList from './src/components/TaskList'
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity); 


export default function App() {
    const[task, setTask] = useState([]); 
    const[open, setOpen] = useState(false);
    const[input, setInput] = useState('');

  //nao vai funcionar pq AsyncStorage nao funciona mais
  /*//buscando todas tarefas ao iniciar o app
  useEffect(() => { //estando vazio, significa q vou montar assim q for chamado
    async function loadTasks(){
      const TaskStorage = await AsyncStorageStatic.getItem('@task');

      if(TaskStorage){
        setTask(JSON.parse(TaskStorage));
      }
    }

    loadTasks(); 
  }, []);

    //Salvando caso tenha alguma tarefa alterada
    useEffect(() => {
      async function saveTasks(){
        await AsyncStorageStatic.setItem('@task', JSON.stringify(task))
      }

      saveTasks();

    },[task] );*/

  function handleAdd() {
    if(input === '') return; 

    const data = {
      key: input,
      task: input
    };
    
    setTask([...task, data]);
    setOpen(false);
    setInput(''); 
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key)
    //retorna todos os itens, menos o q foi clicado
    //se o item por igual ao q tem q deletar, nao retorno ele 
    //passo isso pro set task, aí ele nao existe
    setTask(find); 

  })

  
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
      
      <View style={styles.content}> 
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
      

      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key) }
      renderItem={ ({ item }) => <TaskList data ={item} handleDelete={handleDelete} /> }
      />

      <Modal 
      animationType="slide"
      transparent={false}
      visible={open}>

        <SafeAreaView style = {styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false)}>
              <Ionicons
              style={{marginLeft: 5, marginRight:5}}
              name="md-arrow-back"
              size={40}
              color="#fff"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>
          
          <Animatable.View 
          style={styles.modalBody}
          animation="fadeInUp"
          useNativeDriver
          >
            <TextInput
            multiline={true}
            placeholder="O que precisa fazer hoje?" 
            placeholderTextColor="#747474"
            style={styles.input}
            value={input}
            onChangeText={ (texto) => setInput(texto) }
            />
            <TouchableOpacity 
            style={styles.handleAdd}
            onPress={ handleAdd }
            >
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>

      </Modal>

      <AnimatedBtn 
      style={styles.fab}
      animation="bounceInUp"
      duration={1500}
      useNativeDriver
      onPress={ () => setOpen(true) }
      >
        <Ionicons name='ios-add' size={35} color = '#fff'/>
      </AnimatedBtn>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create ({
  container: {
    flex:1,
    backgroundColor: '#171d31'
  },
  title: {
    marginTop: 10,
    paddingBottom:10,
    fontSize: 30,
    textAlign: 'center',
    color:'#FFFfff'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: "#0094ff",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2, //da sombra
    zIndex: 9,     // deixa acima
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { //dentro vai um objeto
      width: 1,
      height: 3,
    }
  },
  modal:{
    flex:1,
    backgroundColor: "#171d31"
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row', 
    alignItems: 'center'
  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 25,
    color: "white"
  },
  modalBody:{
    marginTop: 15
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top', 
    color: '#000',
    borderRadius: 5
  },
  handleAdd:{
    backgroundColor:'#fff',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText: {
    fontSize: 25,
  }
});