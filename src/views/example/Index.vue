<template>
  <div>
    <v-card id='$$example-list'>
      <v-card-text class='d-flex align-center flex-wrap pb-0'>
        <div class='d-flex align-center  pb-5'>
          <h2>{{ $t('$examples') }}</h2>
        </div>
        <v-spacer></v-spacer>
        <div class='d-flex align-center pb-5'>
          <v-btn
            color='primary'
            class='me-3'
            @click='isOpenCreateDialog=!isOpenCreateDialog'
          >
            <v-icon
              size='18'
              class='me-1'
            >
              {{ icons.mdiPlus }}
            </v-icon>
            <span>{{ $t('Create') }}</span>
          </v-btn>
        </div>
      </v-card-text>
      <!-- table -->
      <v-data-table
        :headers='tableColumns'
        :items='dataList'
        :options.sync='options'
        :loading='loading'
        class='text-no-wrap'
        hide-default-footer
      >
        <template #[`item.id`]='{item}'>
          {{ item.id }}#
        </template>
        <template #[`item.actions`]='{item}'>
          <v-tooltip color='secondary' bottom>
            <template #activator='{ on, attrs }'>
              <v-btn
                v-bind='attrs'
                v-on='on'
                icon
                small
                color='secondary'
                @click.stop.prevent='editItem(item)'
                class='m-19'>
                <v-icon size='21'>
                  {{ icons.mdiPencil }}
                </v-icon>
              </v-btn>
            </template>
            <span>{{ $t('Edit') }}</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <v-divider></v-divider>
      <v-card-text class='pt-2'>
        <v-row>
          <v-col
            lg='2'
            cols='3'
          >
            <v-select
              :items='[5,10,15,20]'
              v-model='itemsPerPage'
              :label="$t('Rows per page')"
              hide-details
              @change='updateItemsPerPage'
            ></v-select>
          </v-col>
          <v-col
            lg='10'
            cols='9'
            class='d-flex justify-end'
          >
            <v-pagination
              v-model='currentPage'
              :length='pageInfo.totalPages'
              @input='fetchDataList'
            ></v-pagination>

          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model='isOutlinedSnackbarVisible'
      :value='true'
      :color='isOutlinedSnackbarColor'
      bottom
      rounded='pill'
      top
    >
      {{ msgSnackbarVisible }}
    </v-snackbar>
    <create v-model='isOpenCreateDialog'
            @update-date='fetchDataList'></create>
    <update v-model='isOpenUpdateDialog'
            @update-date='fetchDataList' :$$example-data='itemData'></update>
  </div>

</template>

<script>
import {
  mdiPlus,
  mdiPencil,
} from '@mdi/js'
import use$example from './use$example'
import {onMounted} from '@vue/composition-api/dist/vue-composition-api'
import Create from './Create'
import Update$example from './Update'


export default {
  name: '$exampleList',
  components: {
    Create,
    Update
  },
  setup() {
    const {
      tableColumns,
      loading,
      options,
      pageInfo,
      currentPage,
      itemsPerPage,
      isOutlinedSnackbarVisible,
      msgSnackbarVisible,
      isOutlinedSnackbarColor,
      fetchDataList,
      dataList,
      isOpenCreateDialog,
      isOpenUpdateDialog,
      editItem,
      itemData
    } = use$example()

    onMounted(() => {
      fetchDataList()
    })

    const updateItemsPerPage = (event) => {
      currentPage.value = 1
      itemsPerPage.value = parseInt(event)
      options.value.itemsPerPage = itemsPerPage.value
      fetchDataList()
    }
    const showMessageDialog = () => {
      msgSnackbarVisible.value = 'Your request will be followed up'
      isOutlinedSnackbarVisible.value = true
    }

    return {
      tableColumns,
      loading,
      options,
      pageInfo,
      currentPage,
      itemsPerPage,
      isOutlinedSnackbarVisible,
      msgSnackbarVisible,
      showMessageDialog,
      updateItemsPerPage,
      dataList,
      fetchDataList,
      icons: {
        mdiPlus,
        mdiPencil,
      },
      isOutlinedSnackbarColor,
      isOpenCreateDialog,
      isOpenUpdateDialog,
      editItem,
      itemData
    }
  },
}
</script>

