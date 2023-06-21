import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList,Modal,Pressable, StyleSheet,TouchableOpacity,Image} from 'react-native';

const FileSystem = ({navigation}) => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [renamingFolderName, setRenamingFolderName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  const createFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        id: Math.random().toString(),
        name: newFolderName.trim(),
      };

      setFolders([...folders, newFolder]);
      setNewFolderName('');
    }
  };

  const deleteFolder = (folderId) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
  };

  const renameFolder = () => {
    if (renamingFolderName.trim() !== '') {
      setFolders(
        folders.map((folder) => {
          if (folder.id === renamingFolderId) {
            return { ...folder, name: renamingFolderName.trim() };
          }
          return folder;
        })
      );

      setRenamingFolderId(null);
      setRenamingFolderName('');
    }
  };

  return (
    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
        <Text onPress={()=>navigation.navigate('Folder')} style={{height:80,marginLeft:30}}>
        <Image source={require('../assets/folder.png')} style={{height:70,width:50}}/>

        </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>+</Text>
      </TouchableOpacity>
     
   <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)} >
      <View style={{margin:20, backgroundColor:'white',padding:20,borderRadius:15,marginTop:80}}>
        <Text style={{fontSize:20,fontWeight:'bold',paddingLeft:20}}>Adding New File</Text>
        <TextInput
          style={{ width: '90%', height: 50, alignSelf: 'center', borderWidth: 1, alignItems: 'center', marginTop: 30, paddingLeft: 20, borderRadius: 10 }}
          placeholder="Enter folder name"
          value={newFolderName}
          onChangeText={setNewFolderName}
        />
        <TouchableOpacity onPress={()=>{
          createFolder(),
          setModalVisible(false)
          }} style={{ marginTop: 20, width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{fontWeight:'bold',color:'white'}}>Create Folder</Text></TouchableOpacity>
      </View>
      </Modal>
      

      <FlatList
        data={folders} 
        renderItem={({ item }) => (
          <View style={{flex:1,margin:20}}><Image source={require('../assets/folder.png')} style={{height:40,width:50}}/>
            {renamingFolderId === item.id ? (
             
              <>
                <TextInput
                  style={styles.input}
                  value={renamingFolderName}
                  onChangeText={setRenamingFolderName}
                />
                <Button title="Rename" onPress={renameFolder} />
              </>
            ) : (
              <>
                <Text style={styles.folderName}>{item.name}</Text>
                <Button
                  title="Rename"
                  onPress={() => {
                    setRenamingFolderId(item.id);
                    setRenamingFolderName(item.name);
                  }}
                />
                <Button title="Delete" onPress={() => deleteFolder(item.id)} />
              </>
              
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
    marginTop:200
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'brown',
 

  },
  button:{
    position:'relative',
    backgroundColor:'#000',
    width:50,
    height:50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    left:320,
    marginTop:160
  }
})

  export default FileSystem;
