import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';

const App = () => {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingFolderId, setRenamingFolderId] = useState(null);
  const [renamingFolderName, setRenamingFolderName] = useState('');

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
    <View style={styles.container}>
      <Text style={{textAlign:'center',justifyContent:'center',fontWeight:'bold',marginTop:50,fontSize:30}}>File Manager System</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Enter folder name"
          value={newFolderName}
          onChangeText={setNewFolderName}
        />
        <Button onPress={createFolder} title='create Folder' />
      </View>

      <FlatList
        data={folders}
        renderItem={({ item }) => (
          <View style={styles.folder}>
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
    borderColor: 'brown'

  }})

  export default App;








