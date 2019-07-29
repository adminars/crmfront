<template>
  <v-layout>
    <!--<v-flex>
      {{ list }}
    </v-flex>-->
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="list.data"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <!-- {{ props }}-->
          <td class="text-xs-right">{{   $moment(props.item.created).format('MM/DD HH:m') }}</td>
          <td class="text-xs-right">{{   $moment(props.item.receipt_date).format('MM/DD HH:m') }}</td>
          <td class="text-xs-right">
            {{ props.item.city }}<br>
            {{ props.item.familyname + ' ' +  props.item.familyname }}<br/>
            ({{ props.item.phone1 }})
          </td>
          <td class="text-xs-right">{{ props.item.trouble }}</td>
          <td class="text-xs-right">{{ props.item.note }}</td>
          <td class="text-xs-right">{{ props.item.status_detail.name }}</td>
          <td class="text-xs-right">{{ props.item.cancel_reason_id }}</td>
          <td class="text-xs-right">{{ props.item.account_detail != null ? props.item.account_detail.store_name : ''}}</td>
          <td class="text-xs-right">{{  props.item.user_detail != null ? (props.item.user_detail.familyname  ) : '' }}</td>
          <td class="text-xs-right">{{  props.item.owner_detail != null ? (props.item.owner_detail.familyname ) : props.item.user_detail != null ? (props.item.user_detail.familyname ) : '' }}</td>
          <td class="text-xs-right">{{ props.item.dial_id }}</td>
          <td class="text-xs-right">tt</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>

</template>
<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import { mapGetters } from 'vuex'
  export default{
    async fetch({ app, store, query }) {
      return Promise.all([
        await store.dispatch('opportunity/opportunitylistAsync', {
          page: query.page || 1,
          ...query
        }),
      ])
    },
    computed: {
      ...mapGetters({
        list: 'opportunity/opportunities',
      }),
    },
    components: {
      Logo,
      VuetifyLogo
    },
    data() {
      return {
        message:'message',

        selected: [],
        headers: [
          {
            text: '受付日',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: '受付No.',
            value: 'calories'
          },
          { text: 'お客様情報', value: 'fat' },
          { text: 'トラブル内容', value: 'carbs' },
          { text: '連絡事項', value: 'protein' },
          { text: '状態', value: 'iron' },
          {
            text: '状況',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: '対応企業',
            value: 'calories'
          },
          { text: '受付者', value: 'fat' },
          { text: '担当者', value: 'carbs' },
          { text: '着番', value: 'protein' },
          { text: '弊社粗利', value: 'iron' }
        ]
      }
    },
    create (){
      this.headers= {

      }
    }
  }
</script>
