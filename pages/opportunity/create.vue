<template>
  <v-layout>
    <v-flex>
      <v-btn @click="handleCreateOpportunity">clcik me</v-btn>
    </v-flex>
    <v-flex>
      <v-card
        style="color:red; font-size:20px; height:150px; text-align:center"
        v-show="result !=null"
      >
        <div>
          CRMのページで登録しているかしていないこID=> {{result}} を確認してください
          <br />
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      result: null,
      url: "nothing",
      form: {
        receiver_name: "rabi neuapne",
        field_id: "1",
        dial_id: 12,
        receipt_date: "2019-08-10",
        familyname: "familyname",
        firstname: "firstname",
        generation_id: 1,
        gender_id: 1,
        company_name: "testcorp",
        prefecture: "東京",
        city: "city",
        address: "komagara",
        phone1: "07043487692",
        incoming_phone: "012345679",
        fax: "123456",
        status_id: 1,
        account_id: 1,
        branch_id: 1,
        work_target_id: 1,
        work_content_id: 1,
        trouble_target: "12",
        trouble: "genki",
        note: "message",
        owner_id: 1
      }
    };
  },
  methods: {
    handleCreateOpportunity() {
      this.$store
        .dispatch("opportunity/opportunityStoreAsync", {
          data: this.form
        })
        .then(result => {
          this.result = result.data.data.id;
          this.url = "http://crm.kurapital.net/opportunities/view/844299";
        })
        .catch(err => {});
    }
  }
};
</script>

