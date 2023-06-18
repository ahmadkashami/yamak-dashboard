<template>
  <div>

    <div>
      <FileUpload :maxSize="1" accept="png" @file-uploaded="getUploadedData" />
    </div>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";

export default {
  name: "Test",
  components: {
    FileUpload,
  },
  data() {
    return {
      file: {},
      fileSelected: false,
      showFileSelect: false,
    };
  },
  methods: {
    getUploadedData(file) {
      this.file = file;
    },
  },
};
</script>
<style>
#app {
  text-align: center;
}
</style>
