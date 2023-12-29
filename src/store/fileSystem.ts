import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import fileApi from '../api/fileApi';

const useFileStore = defineStore('file', () => {
    const fileList: Ref = ref([]);

    async function getFileList() {
        console.log('emit store')
        fileList.value = await fileApi.getAllFiles({ start: 0, size: 50 });
        return fileList.value;
    }


    return { fileList, getFileList }
})


export default useFileStore;