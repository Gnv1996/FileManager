import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Modal, TextInput, PermissionsAndroid, FlatList, Image } from 'react-native';
import { useState } from "react";
import RNFS from 'expo-file-system';



const FileManagerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [foldename, setFolderName] = useState('');
  const [folders, setFolders] = useState([])
  const [currentPath, setCurrentPath] = useState(RNFS.DocumentDirectoryPath);



  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_External_STORAGE,
        {
          title: 'App Storage Permission',
          message:
            'App needs access to your Storage' +
            'so you can take Create Folder.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Storage');
        getAllFolder(currentPath)
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestStoragePermission();

  }, [])
  const getAllFolder = (Path) => {
    RNFS.readDir(Path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);
        setFolderName(result)

        // stat the first file
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });

  };

  const isFolder = (name) => {
    let itsFolder = name.includes('.')
    return itsFolder
  }

  const createFolder = () => {
    RNFS.mkdir(currentPath + "/" + foldename).then(res => {
      getAllFolder(currentPath)
    }).catch(err => { console.log(err) })
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ margin: 20 }}>{currentPath}</Text>
      <View style={{ marginTop: 50 }}>
        <FlatList data={folders} numColumns={2} renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{ width: '50%', justifyContent: 'center', alignItems: 'center', height: 100 }}>{isFolder(item.name) ? (<View style={{ width: '50%', height: '50%', backgroundColor: '#00000000' }} onPress={()=>{if(itsFolder(item.name)){
              setCurrentPath(currentPath + '/'+item.name)
              getAllFolder(currentPath+'/'+item.name)
            }}}><Text>file</Text></View>) : (<Image source={require('./assets/folder.png')} style={{ width: 50, height: 50 }} />)}<Text>{item.name.length > 20 ? item.name.substring(0, 10) + '........' : item.name}</Text></TouchableOpacity>
          )

        }} />

      </View>
      <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 40, backgroundColor: '#000', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }} onPress={() => { setModalVisible(true) }} ><Text style={{ color: '#fff' }}
      >+</Text></TouchableOpacity>
      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)} >
        <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}></View>
        <View style={{ backgroundColor: '#fff', width: '90%', height: 200, borderRadius: 10, left: 20, top: 80 }}>
          <TextInput placeholder="Enter your File Name" style={{ width: '90%', height: 50, alignSelf: 'center', borderWidth: 1, alignItems: 'center', marginTop: 50, paddingLeft: 20, borderRadius: 10 }} />
          <TouchableOpacity style={{ marginTop: 20, width: '90%', alignSelf: 'center', height: 50, borderRadius: 10, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white', fontWeight: 'bold' }} onPress={() => { setModalVisible(false), createFolder() }}>Create Folder</Text></TouchableOpacity>

        </View>

      </Modal>

    </View>
  )
}
export default FileManagerScreen;