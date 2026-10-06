<template>
  <div class="file-upload flex">
    <div>
      <label class="mx-4 v-field__input">{{ label }}:</label>
    </div>
    <div class="file-upload__area">
      <div v-if="!file.isUploaded">
        <input
          id=""
          type="file"
          name=""
          @change="handleFileChange($event)"
        >
        <div v-if="errors.length > 0">
          <div
            v-for="(error, index) in errors"
            :key="index"
            class="file-upload__error"
          >
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="file.isUploaded"
        class="upload-preview"
      >
        <img
          v-if="file.isImage"
          :src="file.url"
          class="file-image"
          alt=""
        >
        <div
          v-if="!file.isImage"
          class="file-extention"
        >
          {{ file.fileExtention }}
        </div>
        <span class="file-name">
          {{ file.name }}{{ file.isImage ? `.${file.fileExtention}` : '' }}
        </span>
        <VDivider class="my-2" />
        <VSheet class="d-flex justify-center">
          <VSheet>
            <VBtn
              class="mx-1"
              size="x-small"
              variant="outlined"
              @click="resetFileInput"
              :loading='isLoading'
            >
              Change file
            </VBtn>
          </VSheet>
          <VSheet>
            <VBtn
              v-if="!acceptFile"
              class="mx-1"
              size="x-small"
              variant="outlined"
              @click="sendDataToParent"
            >
              Accept File
            </VBtn>
          </VSheet>
        </VSheet>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadFile } from '@/plugins/uploadFilesService'

export default {
  name: 'FileUpload',
  props: {
    maxSize: {
      type: Number,
      default: 1,
      required: true,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      isLoading: false,
      uploadReady: true,
      acceptFile: false,
      file: {
        name: '',
        size: 0,
        type: '',
        fileExtention: '',
        url: '',
        isImage: false,
        isUploaded: false,
      },
    }
  },
  methods: {
    handleFileChange(e) {
      this.errors = []

      // Check if file is selected
      if (e.target.files && e.target.files[0]) {
        // Check if file is valid
        if (this.isFileValid(e.target.files[0])) {
          // Get uploaded file
          const file = e.target.files[0],

            // Get file size
            fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100,

            // Get file extention
            fileExtention = file.name.split('.').pop(),

            // Get file name
            fileName = file.name.split('.').shift(),

            // Check if file is an image
            isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtention)


          // Print to console
          console.log(fileSize, fileExtention, fileName, isImage)

          // Load the FileReader API
          let reader = new FileReader()
          reader.addEventListener(
            'load',
            () => {
              // Set file data
              this.file = {
                file: file,
                name: fileName,
                size: fileSize,
                type: file.type,
                fileExtention: fileExtention,
                isImage: isImage,
                url: reader.result,
                isUploaded: true,
              }
              if (this.file.isUploaded) {
                this.sendDataToParent()
              }
            },
          )

          // Read uploaded file
          reader.readAsDataURL(file)
        } else {
          console.log('Invalid file')
        }
      }
    },
    isFileSizeValid(fileSize) {
      if (fileSize <= this.maxSize) {
        console.log('File size is valid')
      } else {
        this.errors.push(`File size should be less than ${this.maxSize} MB`)
      }
    },
    isFileTypeValid(fileExtention) {
      if (this.accept.split(',').includes(fileExtention)) {
        console.log('File type is valid')
      } else {
        this.errors.push(`File type should be ${this.accept}`)
      }
    },
    isFileValid(file) {
      this.isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100)
      this.isFileTypeValid(file.name.split('.').pop())

      return this.errors.length === 0
    },
    resetFileInput() {
      this.uploadReady = false
      this.acceptFile = false
      this.$nextTick(() => {
        this.uploadReady = true
        this.file = {
          file: null,
          name: '',
          size: 0,
          type: '',
          data: '',
          fileExtention: '',
          url: '',
          isImage: false,
          isUploaded: false,
        }
      })
    },
    sendDataToParent() {
      this.acceptFile = true
      this.uploadedPhoto(this.file)
    },
    uploadedPhoto(currentFile) {
      this.isLoading = true
      uploadFile(currentFile.file).then(response => {
        this.$emit('fileUploaded', response.data.data.secure_url)
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.file-upload {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  gap: var(--yamak-space-3);
  inline-size: 100%;

  > div:first-child {
    flex: 0 0 auto;
  }
}

.file-upload .file-upload__area {
  display: flex;
  box-sizing: border-box;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--yamak-border);
  border-radius: var(--yamak-radius-md);
  background-color: var(--yamak-surface-secondary);
  inline-size: 100%;
  min-block-size: 112px;
  min-inline-size: 0;
  padding-block: var(--yamak-space-4);
  padding-inline: var(--yamak-space-4);

  input[type="file"] {
    color: var(--yamak-text-secondary);
    max-inline-size: 100%;

    &::file-selector-button {
      border: 1px solid var(--yamak-border);
      border-radius: var(--yamak-radius-sm);
      background-color: var(--yamak-surface);
      color: var(--yamak-text-primary);
      cursor: pointer;
      margin-inline-end: var(--yamak-space-2);
      padding-block: var(--yamak-space-2);
      padding-inline: var(--yamak-space-3);
    }

    &::file-selector-button:hover {
      border-color: var(--yamak-primary);
    }
  }
}

.file-upload .file-upload__error {
  color: var(--yamak-danger);
  font-size: var(--yamak-font-size-xs);
  margin-block-start: var(--yamak-space-2);
}

.file-upload .upload-preview {
  inline-size: 100%;
  text-align: center;
}

.file-upload .upload-preview .file-image {
  block-size: 120px;
  inline-size: 100%;
  max-inline-size: 100%;
  object-fit: contain;
}

.file-upload .upload-preview .file-extention {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: var(--yamak-radius-sm);
  margin: 0.5em auto;
  background: var(--yamak-surface-elevated);
  block-size: 80px;
  color: var(--yamak-text-secondary);
  font-size: var(--yamak-font-size-md);
  font-weight: var(--yamak-font-weight-medium);
  inline-size: 80px;
  text-transform: uppercase;
}

.file-upload .upload-preview .file-name {
  color: var(--yamak-text-secondary);
  font-size: var(--yamak-font-size-sm);
  font-weight: var(--yamak-font-weight-medium);
  overflow-wrap: anywhere;
}

@media (width <= 600px) {
  .file-upload {
    flex-direction: column;
    align-items: stretch;
  }

  .file-upload .file-upload__area {
    flex-basis: auto;
  }
}
</style>
