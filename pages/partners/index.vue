<template>
  <v-layout>


    <v-flex>
       <h1>パトナーメッセージログ </h1>
      <v-data-table
        :headers="headers"
        :items="list.data"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="text-xs-right">{{ moment(props.item.created).format('MM DD HH:m') }} {{ props }} </td>
          <td class="text-xs-right">{{ props.item.user_id != null ? (props.item.owner_detail.user_id ) : props.item.user_id != null ? (props.item.user_detail.user_id ) : '' }}</td>
          <td class="text-xs-right">{{ props.item.crmId !== null ? (props.item.crmId):'rabi' }}</td>
           <td class="text-xs-right">{{ props.item.message !== null ? (props.item.message):'rabi' }}</td>

        </template>
         <template v-slot:item.action="{ item }"><v-btn small color="primary" @click="check(item)">ラインID追加します</v-btn> </template>
      </v-data-table>
    </v-flex>

<v-dialog v-model="dialog" persistent max-width="600px">
     <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>

      </template>
       -->
      <v-card>
        <v-card-title>
          <span class="headline">パトナーのラインIDの追加</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
               <v-flex xs12>
                <v-text-field
                label="パトナー名前*"
                type="text"
                name ='partner_name'
                v-validate="'required'"
                data-vv-as="パトナー名前"
                v-model="dialogForm.partnerName"/>
                <span style="color:red;">{{ errors.first('partner_name') }}</span>
                <v-text-field
                label="パトナーラインID*"
                type="text"
                disabled
                required
                v-model="dialogForm.partnerLineid"
                 name ='partnerLineid'
                v-validate="'required'"
                data-vv-as="パトナーラインID"/>
                 <span style="color:red;">{{ errors.first('partnerLineid') }}</span>
                <v-text-field
                label="パトナーアカウントID*"
                type="text"
                required
                v-model="dialogForm.partnerId"
                 name ='partnerId'
                v-validate="'required'"
                data-vv-as="パトナーアカウントID"/>
                 <span style="color:red;">{{ errors.first('partnerId') }}</span>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*は必須項目です</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="blue darken-1" text @click="handleSavePartner">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.snackbar"
     :vertical="mode === 'vertical'"
       :right="x === 'right'"
    >
      {{ snackbar.text }}
      <v-btn
        color="error"
        text
        @click="snackbar.snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-layout>

</template>
<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import { mapGetters } from 'vuex'
  export default{
    async fetch({ app, store, query }) {
      return Promise.all([
        await store.dispatch('linelog/LineMessageLogAsync', {
          page: query.page || 1,
          ...query
        }),
      ])
    },
    computed: {
      ...mapGetters({
        list: 'linelog/lineData',
      }),
    },
    components: {
      Logo,
      VuetifyLogo
    },
    data() {
      return {
        snackbar:{
          snackbar:false,
          text:'please check your input'
        },
        dialog: false,
        dialogForm :{
          partnerName:'',
          partnerId:'',
          partnerLineid:''
        },
        message:'message',
        selected: [],
        headers: [
          {
            text: '受付日',
            align: 'left',
            sortable: false,
            value: 'created_at'
          },
          {
            text: 'ラインID.',
            value: 'user_id'
          },
           { text: 'アカウントID', value: 'crmId' },
          { text: 'メッセージ', value: 'message' },
           { text: 'action', value: 'action' },
        ]
      }
    },
    create (){
      this.headers= {

      }
    },
    methods:{
      check(item){
        console.log(item)
        this.dialog = true
        this.dialogForm.partnerLineid = item.user_id
         this.dialogForm.partnerName = item.message
         this.dialogForm.partnerId=item.crmId
      },
      handleSavePartner(){
        this.$validator.validateAll().then((success) => {
        if (success) {
          alert('Saved.');
          return
        }
       this.snackbar.snackbar=true
      });
      }
    }
  }
</script>
