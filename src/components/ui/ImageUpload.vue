<template>
  <div class="upload-file">
    <input type="file" @change="onFileChange" accept="image/*">
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Image Preview" />
    </div>
    <button class="btn-blue" @click="uploadImage" :disabled="!selectedFile">Upload</button>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';

export default {
  name: 'ImageUpload',
  props: {
    filename: {
      type: Object,
    },
  },
  setup(props) {
    const { filename } = toRefs(props);
    const selectedFile = ref(null);
    const imageUrl = ref('');

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        selectedFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const uploadImage = async () => {
      if (!selectedFile.value) return;

      const formData = new FormData();
      formData.append('image', selectedFile.value);

      try {
        const response = await fetch('http://localhost/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        filename.value.url = data.filename
        // console.log(filename.value.url)
        alert('Image uploaded successfully');
        // console.log(data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    return {
      selectedFile,
      imageUrl,
      onFileChange,
      uploadImage,
    };
  },
};
</script>

<style>
img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}
</style>